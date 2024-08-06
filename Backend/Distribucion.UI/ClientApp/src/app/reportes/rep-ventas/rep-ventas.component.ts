import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-rep-ventas',
  templateUrl: './rep-ventas.component.html',
  styleUrls: ['./rep-ventas.component.css']
})
export class RepVentasComponent implements OnInit {

  public dataTempProducto: any;

  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }

  today: string = new Date().toDateString();
  fInicio: string;
  fFin: string;
  producto: number;
  frm: FormGroup;
  cSector: number;
  totalVenta: number = 0;
  totalAmortizacion: number = 0;
  sector: any[] = [];
  equivalencia: any[];

  ngOnInit() {
    this.frm = this.formBuilder.group({
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],
      infoProducto: [null, [Validators.required]]
    });

    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProducto = data;
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });

    this.listaSector();
    this.listaEquivalencia();
  }

  listaSector() {
    this.distribucionService.getListaSector().subscribe(
      data => {
        this.sector = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  listaEquivalencia() {
    this.distribucionService.getListaEquivalencia().subscribe(
      data => {
        this.equivalencia = data.filter(x => x.estado > 0);
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }
  
  public reporteVentas: any;
  getReporte() {
    debugger;
    this.distribucionService.getReporteVentas(this.fInicio, this.fFin, this.producto).subscribe(
      data => {
        this.reporteVentas = data;
        this.totalVenta = 0;
        this.totalAmortizacion = 0;
        data.forEach(x => {
          this.totalVenta = this.totalVenta + x.precioIngresadoVenta;
          this.totalAmortizacion = this.totalAmortizacion + x.amortizacion;
        });
        this.loadItems();
      })
  }

  public aggregates: any[] = [
    { field: 'precioIngresadoVenta', aggregate: 'sum' },
    { field: 'cantidadVenta', aggregate: 'sum' },
    { field: 'cantidadVentaEstandar', aggregate: 'sum' },
    { field: 'stockInicial', aggregate: 'sum' },
    { field: 'cantidadCompra', aggregate: 'sum' },
    { field: 'cantidadCompraEstandar', aggregate: 'sum' },
    { field: 'amortizacion', aggregate: 'sum' },
    { field: 'stockSobrante', aggregate: 'sum' },
    { field: 'productName', aggregate: 'count' }];

  public groups: GroupDescriptor[] = [
    { field: 'productParentName', aggregates: this.aggregates },
    { field: 'productName', aggregates: this.aggregates },
    { field: 'sectorName', aggregates: this.aggregates }];

  public reporteVentasKendo: DataResult;
  private loadItems(): void {
    this.reporteVentasKendo = process(this.reporteVentas, { group: this.groups });
  }


}

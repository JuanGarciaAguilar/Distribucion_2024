import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Stock } from '../../Shared/stock';
import { Producto } from '../../Shared/Producto';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { debug } from 'util';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-rep-capital',
  templateUrl: './rep-capital.component.html',
  styleUrls: ['./rep-capital.component.css']
})
export class RepCapitalComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router) { }
  capitalTotal: number;
  today: string = new Date().toDateString();
  fechaLunes: Date = new Date();

  public dataTempProducto: any[];
  public dataTempTotalCapital: any;
  public dataTempAmortizacionDeuda: any;
  public dataTempGastos: any[];
  public totalStock: number;
  public dataTempSaldoDeposito: any;
  public totalGeneral: number;
  public totalGastos: number;
  public efectivo: number;
  public credito: number;

  showEfectivo: boolean = false;
  showCredito: boolean = false;
  showProveedores: boolean = false;
  showProductos: boolean = false;
  ngOnInit() {
    this.showEfectivo = false;
    this.showCredito = false;
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProducto = data;
      });

    this.distribucionService.getTotalCapital().subscribe(
      data => {
        this.dataTempTotalCapital = data;
      });

    this.distribucionService.getMoneyAmortizadoDeuda().subscribe(
      data => {
        this.dataTempAmortizacionDeuda = data;

        this.distribucionService.getGastosHastaHoy().subscribe(
          data => {
            this.dataTempGastos = data;
            this.totalGastos = 0;
            this.dataTempGastos.forEach(x => this.totalGastos = this.totalGastos + x.gastoTotal);
            //this.efectivo = this.dataTempAmortizacionDeuda.filter(x => x.sectorName == 'TOTAL')[0].amortizacion - this.totalGastos;
            this.credito = this.dataTempAmortizacionDeuda.filter(x => x.sectorName == 'TOTAL')[0].deudaActualizada;
          }
        );

        this.distribucionService.getReporteSaldoDeposito().subscribe(
          data => {
            this.dataTempSaldoDeposito = data;
            this.totalGeneral = parseFloat(this.dataTempTotalCapital) + this.dataTempSaldoDeposito.filter(x => x.proveedorName == 'TOTAL')[0].saldoDeposito
          });
      });
    this.distribucionService.getEfectivo().subscribe(data => this.efectivo = data);
    this.getStockAll();
    this.distribucionService.currentCapitalTotal.subscribe(c => { this.capitalTotal = c; });
  }

  public reporteStockTemp: any[];
  getStockAll() {
    this.distribucionService.getStockAll().subscribe(
      data => {
        this.reporteStockTemp = data;
        this.totalStock = 0;
        this.reporteStockTemp.forEach(x => this.totalStock = this.totalStock + x.valorTotal)
        this.loadItems();
      });
  }

  public aggregates: any[] = [
    { field: 'valorTotal', aggregate: 'sum' }];

  public groups: GroupDescriptor[] = [{ field: 'productParentName', aggregates: this.aggregates }];

  private loadItems(): void {
    this.reporteStockKendo = process(this.reporteStockTemp, { group: this.groups });
  }

  public reporteStockKendo: DataResult;

  changeShowEfectivo() { this.showEfectivo = !this.showEfectivo }
  changeShowCredito() { this.showCredito = !this.showCredito }
  changeShowProveedores() { this.showProveedores = !this.showProveedores }
  changeShowProductos() { this.showProductos = !this.showProductos }
}

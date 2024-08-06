import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Producto } from '../../Shared/Producto';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';


@Component({
  selector: 'app-rep-compras',
  templateUrl: './rep-compras.component.html',
  styleUrls: ['./rep-compras.component.css']
})
export class RepComprasComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }

  fInicio: string;
  fFin: string;
  nProveedor: string;
  frm: FormGroup;

  public dataTempProveedores: any;
  ngOnInit() {
    this.distribucionService.getProveedoresAll().subscribe(
      data => {
        this.dataTempProveedores = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
    this.frm = this.formBuilder.group({
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],
      proveedor: [null, [Validators.required]]
    })
  }

  public reporteComprasTemp: any;
  getReporte() {
    this.distribucionService.getReporteCompras(this.fInicio, this.fFin, this.nProveedor).subscribe(
      data => {
        this.reporteComprasTemp = data;
        this.loadItems();
      });
  }

  public aggregates: any;
  
  public state: State = {
    skip: 0,
    take: 10,
    group: [{ field: 'proveedorName', aggregates: this.aggregates }]
  };

  private loadItems(): void {
    this.reporteComprasKendo = process(this.reporteComprasTemp, this.state);
    this.total = aggregateBy(this.reporteComprasTemp, this.aggregates);
  }

  public reporteComprasKendo: any;
  public total: any;

  public dataStateChange(state: DataStateChangeEvent): void {
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }

    this.state = state;

    this.reporteComprasKendo = process(this.reporteComprasTemp, this.state);
  }


}

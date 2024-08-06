import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Producto } from '../../Shared/Producto';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroupName } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-rep-gastos',
  templateUrl: './rep-gastos.component.html',
  styleUrls: ['./rep-gastos.component.css']
})
export class RepGastosComponent implements OnInit {

  today: string = new Date().toDateString();
  repGastosFechaInicio: string = new Date().toDateString();
  repGastosFechaFin: string = new Date().toDateString();
  frm: FormGroup;
  public reporteGastosTemp: any;

  //Totales
  totalDiesel: number = 0;
  totalAyudante: number = 0;
  totalCasa: number = 0;
  totalOtros: number = 0;
  totalSunat: number = 0;
  totalMonto: number = 0;

  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frm = this.formBuilder.group({
      fInicio: [null, [Validators.required]],
      fFin: [null, [Validators.required]],
    })
    this.reporteGastosKendo = null;
  }

  getReporte(repGastosFechaInicio: string, repGastosFechaFin: string) {
    this.clearTotales();
    this.reporteGastosTemp = [];
    this.loadItems();
    this.distribucionService.getReporteGastos(repGastosFechaInicio, repGastosFechaFin).subscribe(
      data => {
        this.reporteGastosTemp = data;
        this.calcularTotales();
        this.loadItems();
      }
    );
  }

  public reporteGastosKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.reporteGastosKendo = {
      data: this.reporteGastosTemp.slice(this.skip, this.skip + this.pageSize),
      total: this.reporteGastosTemp.length
    };
  }

  clearTotales() {
    this.totalAyudante = 0;
    this.totalCasa = 0;
    this.totalDiesel = 0;
    this.totalMonto = 0;
    this.totalOtros = 0;
    this.totalSunat = 0;
  }

  calcularTotales() {
    this.reporteGastosTemp.forEach(x => {
      this.totalDiesel = this.totalDiesel + x.diesel;
      this.totalAyudante = this.totalAyudante + x.ayudante;
      this.totalCasa = this.totalCasa + x.casa;
      this.totalOtros = this.totalOtros + x.otros;
      this.totalSunat = this.totalSunat + x.sunat;
    });
    this.totalMonto = this.totalDiesel + this.totalAyudante + this.totalCasa + this.totalOtros + this.totalSunat;
  }

}

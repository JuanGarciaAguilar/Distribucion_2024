import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormsModule, ReactiveFormsModule, FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DistribucionService } from '../Shared/distribucion.service';
import { Gasto } from '../Shared/gasto';
import { GastoDetalle } from '../Shared/gasto-detalle';

import { Subject } from 'rxjs/Subject'
import { NgModule } from '@angular/core';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;


@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.css']
})
export class ListaGastosComponent implements OnInit {
  form: FormGroup;
  constructor(public distribucionService: DistribucionService, private formBuilder: FormBuilder) { }

  fInicioModal : Date = new Date;
  fFinModal : Date = new Date;
  gastoTemporal: Gasto = new Gasto();
  newInsumo: string = '';
  newMonto: number;
  newcomme: string;
  idBorrar: number;
  checkFecha: boolean = true;
  counterAdds: number = 0;

  gastoDetalleTemporal: GastoDetalle;

  //Variables para validacion
  estadoBoton1: boolean = true;
  estadoBoton2: boolean = false;
  validFechas1: boolean = true;
  validFechas2: boolean = true;
  rangeDateExceed: boolean = false;
  public dataTemp: any;

  ngOnInit() {
    this.distribucionService.getGastosAll().subscribe(
      data => {
        this.dataTemp = data;
        this.loadItems();
      },
      error => {
        //this.distribucionService.sessionExpired(error);
      }
      );
  }

  public gastosKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }


  public loadItems(): void {
    this.gastosKendo = {
      data: this.dataTemp.slice(this.skip, this.skip + this.pageSize),
      total: this.dataTemp.length
    };
  }

  public gastosDetalleKendo: GridDataResult;
  public pageSizeDetalle: number = 2;
  public skipDetalle: number = 0;

  public pageChangeDetalle(event: PageChangeEvent): void {
    this.skipDetalle = event.skip;
    this.loadItemsDetalle();
  }

  public loadItemsDetalle(): void {
    this.gastosDetalleKendo = {
      data: this.gastoTemporal.gastoSemanalTabla.slice(this.skipDetalle, this.skipDetalle + this.pageSizeDetalle),
      total: this.gastoTemporal.gastoSemanalTabla.length
    };
  }

  resetStatus() {
    this.estadoBoton2 = false;
    this.estadoBoton1 = true;
  }

  deleteGastoFromTempData(id) {
    for (var i = 0; i < this.dataTemp.length; i++) {
      if (this.dataTemp[i].gastoSemanalId == id) {
        this.dataTemp.splice(i, 1);
      }
    }
  }

  enableBtnEnviar() {
    if (this.validFechas1 == true && this.validFechas2 == true && this.rangeDateExceed == false) {
      this.estadoBoton2 = false;
    }
    else {
      this.estadoBoton2 = true;
    }
  }

  deleteDetalleFromTempData(idDetalle) {
    this.gastoTemporal.gastoSemanalTabla.forEach(x => {
      if (idDetalle == x.gastoSemanalDetalleId) {
        this.gastoTemporal.gastoTotal = this.gastoTemporal.gastoTotal - x.gasto;
        this.gastoTemporal.gastoSemanalTabla.splice(this.gastoTemporal.gastoSemanalTabla.indexOf(x), 1);
      }
    });
    this.loadItemsDetalle();
  }

  deleteGastoById() {
    this.distribucionService.deleteGastoById(this.idBorrar).subscribe(
      data => {
        this.loadItems();
        this.confirmModal('delete');
      },
      err => console.log(err),
    );
      this.deleteGastoFromTempData(this.idBorrar);
  }

  getGastoTemporal(id, fini, ffin, gtotal, gtabla) {
    this.newInsumo = '';
    this.newMonto = null;
    this.validFechas1 = true;
    this.validFechas2 = true;
    this.gastoTemporal = new Gasto;
    this.gastoTemporal.gastoSemanalId = id;
    this.gastoTemporal.fechaInicio = fini;
    this.gastoTemporal.fechaFinal = ffin;
    this.gastoTemporal.gastoTotal = gtotal;
    this.gastoTemporal.gastoSemanalTabla = Object.assign([], gtabla);
    this.fInicioModal = fini;
    this.fFinModal = ffin;
    this.resetStatus();
    this.loadItemsDetalle();
  }

  addDetalleToArrayTemp() {
    this.gastoDetalleTemporal = new GastoDetalle;
    this.gastoDetalleTemporal.gastoSemanalDetalleId = 0;
    this.gastoDetalleTemporal.insumo = this.newInsumo;
    this.gastoDetalleTemporal.gasto = this.newMonto;
    this.gastoDetalleTemporal.comentario = this.newcomme;
    this.gastoTemporal.gastoSemanalTabla.push(this.gastoDetalleTemporal);
    this.gastoTemporal.gastoTotal = this.gastoTemporal.gastoTotal + this.newMonto;
    this.counterAdds++;
    this.newInsumo = "";
    this.newMonto = null;
    this.newcomme = null;
    this.estadoBoton1 = true;
    this.loadItemsDetalle();
  }

  updateData() {
    this.distribucionService.updateGasto(this.gastoTemporal).subscribe(
      data => {
        this.confirmModal('update');
        //this.clean();
      },
      err => console.log(err),
    );
    this.dataTemp.forEach(x => {
      if (x.gastoSemanalId == this.gastoTemporal.gastoSemanalId) {
        x.fechaInicio = this.gastoTemporal.fechaInicio;
        x.fechaFinal = this.gastoTemporal.fechaFinal;
        x.gastoTotal = this.gastoTemporal.gastoTotal;
        x.gastoSemanalTabla = Object.assign([], this.gastoTemporal.gastoSemanalTabla);
      }
    })
  }

  guardarId(id) {
    this.idBorrar = id;
  }

  captureNewFechaFin(fFinal) {
    this.gastoTemporal.fechaFinal = fFinal  ;
    this.fFinModal = fFinal;
  }

  captureNewFechaInicio(fInicio) {
    this.gastoTemporal.fechaInicio = fInicio;
    this.fInicioModal = fInicio;
  }

  //FUNCIONES PARA VALIDACION DE DATOS

  checkDetalle() {
    if (this.newInsumo != null && this.newInsumo != "" && this.newMonto > 0) {
      this.estadoBoton1 = false;
    }
    else {
      this.estadoBoton1 = true;
    }
  }

  revisarFechaGastos(fIni, fFin): boolean {
    this.validFechas2 = true;
    let startDate = new Date(fIni).setMinutes(new Date(fIni).getTimezoneOffset());
    let endDate = new Date(fFin).setMinutes(new Date(fFin).getTimezoneOffset());
    this.dataTemp.forEach(x => {
      if (this.gastoTemporal.gastoSemanalId != x.gastoSemanalId) {
        if ((startDate < new Date(x.fechaInicio).getTime() && endDate < new Date(x.fechaInicio).getTime()) || (startDate > new Date(x.fechaFinal).getTime() && endDate > new Date(x.fechaFinal).getTime())) {
          this.validFechas2 = this.validFechas2 && true;
        }
        else {
          this.validFechas2 = this.validFechas2 && false;
        }
      }
    });
    console.log('validFechas2', this.validFechas2);
    console.log('estadoBoton2', this.estadoBoton2);
    return this.validFechas2;
  }

  revisarFechasEntreSi(fIni, fFin): boolean {
    this.validFechas1 = true;
    let startWeekDate = new Date(fIni).getUTCDay();
    if (startWeekDate == 0) { startWeekDate = 7 }
    let endWeekDate = new Date(fFin).getUTCDay();
    if (endWeekDate == 0) { endWeekDate = 7 }
    let startDate = new Date(fIni).getTime();
    let endDate = new Date(fFin).getTime();
    if (startWeekDate <= endWeekDate && (endDate - startDate) <= 518400000) {
      this.rangeDateExceed = false;
    }
    else {
      this.rangeDateExceed = true;
    }
    if (fIni > fFin) {
      this.validFechas1 = this.validFechas1 && false;
    }
    else {
      this.validFechas1 = this.validFechas1 && true;
    }
    console.log('validFechas1', this.validFechas1);
    console.log('estadoBoton2', this.estadoBoton2);
    return this.validFechas1;
  }

  checkVacio(val) {
    if (val == '') {
      this.newMonto = null;
      this.estadoBoton1 = true;
    }
  }

  txtClass: string;
  checkInput(input) {
    if (input == '' || input == null) {
      this.txtClass = '';
    } else {
      this.txtClass = 'active';
    }
  }

  openMod(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }
  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "El gasto registro correctamente", "Actualizado", "El gasto se actualizo correctamente", "Eliminado", "El gasto se elimino correctamente.");
  }

}

import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Gasto } from '../Shared/gasto';
import { GastoDetalle } from '../Shared/gasto-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { stat } from 'fs';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-reg-gastos',
  templateUrl: './reg-gastos.component.html',
  styleUrls: ['./reg-gastos.component.css']
})
export class RegGastosComponent implements OnInit {

  constructor(public distribucionService : DistribucionService) { }

  validarVista: boolean = true;
  q: Event;
  idGasto: number = 1;
  idGastoDet: number = 1;
  mMonto: number;
  insumo: string;
  tGasto: string;
  comentario: string;
  fInicio: Date;
  fFin: Date;
  gastoDet: GastoDetalle;
  gasto: Gasto;
  gastoDetalleArray: GastoDetalle[] = [];
  checkFecha: boolean;
  idBorrar: number;

  //Variables para validacion
  estadoBoton1: boolean = true;
  estadoBoton2: boolean = true;
  validFechas1: boolean = true;
  validFechas2: boolean = true;
  validMonto: boolean = true;
  rangeDateExceed: boolean = false;

  public dataTempGastos: any;
  ngOnInit() {
    this.distribucionService.changeValidarCambio(this.validarVista);
    this.distribucionService.getGastosAll().subscribe(
      data => {
        this.dataTempGastos = data;
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
    this.gasto = new Gasto();
    
  }

  public compraverificarKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  public loadItems(): void {
    this.compraverificarKendo = {
      data: this.gastoDetalleArray.slice(this.skip, this.skip + this.pageSize),
      total: this.gastoDetalleArray.length
    };
  }

  public getInsumo() {
    this.insumo = this.tGasto;
  }

  public deleteFromGastoArray() {
    for (var i = 0; i < this.gastoDetalleArray.length; i++) {
      if (this.gastoDetalleArray[i].gastoSemanalDetalleId == this.idBorrar) {
        this.gasto.gastoTotal = this.gasto.gastoTotal - this.gastoDetalleArray[i].gasto;
        this.gastoDetalleArray.splice(i, 1);
        this.confirmModal('delete');
      }
    }
    this.checkBotonEnviar();
    this.loadItems();
  }

  checkBotonEnviar() {
    if (this.gastoDetalleArray.length > 0) {
      this.estadoBoton2 = false;
    }
    else {
      this.estadoBoton2 = true;
    }
  }

  public cleanArray() {
    while (this.gastoDetalleArray.length > 0)
    {
      this.gastoDetalleArray.splice(0, 1);
      this.gasto.gastoTotal = 0;
    }
  }

  cleanInputs() {
    this.mMonto = null;
    this.tGasto = null;
    this.validFechas1 = true;
    this.validFechas2 = true;
    this.validMonto = true;
    this.estadoBoton1 = true;
    this.comentario = null;
  }

  public addGastoToArray() {
    this.gastoDet = new GastoDetalle;
    this.gastoDet.insumo = this.tGasto;
    this.gastoDet.gasto = this.mMonto;
    this.gastoDet.comentario = this.comentario;
    this.gastoDet.gastoSemanalId = this.idGasto;
    this.gastoDet.gastoSemanalDetalleId = this.idGastoDet;
    this.idGastoDet = this.idGastoDet + 1;
    this.gastoDetalleArray.push(this.gastoDet);
    this.sumarGastoTotal();
    this.cleanInputs();
    if (this.estadoBoton2 == true) {
      this.checkBotonEnviar();
    }
    this.loadItems();
  }

  public sumarGastoTotal() {
    this.gasto.gastoTotal = 0;
    for (var i = 0; i < this.gastoDetalleArray.length; i++) {
      this.gasto.gastoTotal = this.gasto.gastoTotal + this.gastoDetalleArray[i].gasto
    }
  }

  public enviarGastoTotal() {
    this.gasto.fechaInicio = this.fInicio;
    this.gasto.fechaFinal = this.fFin;
    this.gasto.gastoSemanalTabla = this.gastoDetalleArray;
    this.distribucionService.insertNewGasto(this.gasto).subscribe(
      data => {
        this.confirmModal('register');
        //this.confirmModal(true);
        //this.clean();
      },
      err => console.log(err),
    );
    this.cleanArray();
    this.cleanInputs();
  }

  captureNewFechaFin(fFinal) {
    this.gasto.fechaFinal = fFinal;
    this.fFin = fFinal;
  }

  captureNewFechaInicio(fInicio) {
    this.gasto.fechaInicio = fInicio;
    this.fInicio = fInicio;
  }

  guardarId(id) {
    this.idBorrar = id;
  }

  checkVacio(val) {
    if (val == '') {
      this.mMonto = null;
      this.estadoBoton1 = true;
    }
    if (val < 0) {
      this.validMonto = false;
    }
    else {
      this.validMonto = true;
    }
  }

  checkDetalle() {
    if (this.tGasto != null && this.tGasto != "" && this.mMonto > 0) {
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
    this.dataTempGastos.forEach(x => {
      if (this.gasto.gastoSemanalId != x.gastoSemanalId) {
        if ((startDate < new Date(x.fechaInicio).getTime() && endDate < new Date(x.fechaInicio).getTime()) || (startDate > new Date(x.fechaFinal).getTime() && endDate > new Date(x.fechaFinal).getTime())) {
          this.validFechas2 = this.validFechas2 && true;
        }
        else {
          this.validFechas2 = this.validFechas2 && false;
        }
      }
    });
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
    return this.validFechas1;
  }

  openMod(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }
  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "El gasto registro correctamente", "Actualizado", "La compra se actualizo correctamente", "Eliminado", "El gasto se elimino correctamente.");
  }

  enableBtnRegistrar() {
    if (this.tGasto != null && this.tGasto != "" && this.mMonto > 0 && this.validFechas1 == true && this.validFechas2 == true && this.rangeDateExceed == false) {
      this.estadoBoton1 = false;
    }
    else {
      this.estadoBoton1 = true;
    }
  }

  enableBtnGuardar()
  {
    if (this.validFechas1 == true && this.validFechas2 == true && this.rangeDateExceed == false) {
      this.estadoBoton2 = false;
    }
    else {
      this.estadoBoton2 = true;
    }
  }
}

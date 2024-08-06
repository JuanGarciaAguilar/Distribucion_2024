import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';

import { DistribucionService } from '../../Shared/distribucion.service';
import { Gasto } from '../../Shared/gasto';
import { GastoDetalle } from '../../Shared/gasto-detalle';

import { Subject } from 'rxjs/Subject'
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Compra } from '../../Shared/compra';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { debug, isNull } from 'util';
import { DISABLED } from '@angular/forms/src/model';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;


@Component({
  selector: 'app-confirmar-compras',
  templateUrl: './confirmar-compras.component.html',
  styleUrls: ['./confirmar-compras.component.css']
})
export class ConfirmarComprasComponent implements OnInit {
  nextSeccion: string;
  validarCambio: boolean = true;


  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }

  validarVista: boolean = true;
  currentCompraObj: Compra;
  compraDetalleArray: CompraDetalle[] = [];

  //Datos generales de la compra
  fCompra: Date;
  fEntrega: Date;
  origenCompra: string;
  totalCompra: number;
  fleteCompra: number;
  eCompra: number;
  public dataTempProducto: any;
  public dataTempProveedor: any;

  ngOnInit() {
    this.distribucionService.currentCompra.subscribe(c => { this.currentCompraObj = c })
    this.currentCompraObj.compraDetalleTabla = this.currentCompraObj.compraDetalleTabla.filter(c => c.compraEstado > 0);

    this.distribucionService.changeValidarCambio(this.validarVista);
    this.inicializarCampos();
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProducto = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.distribucionService.getProveedoresAll().subscribe(
      data => {
        this.dataTempProveedor = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.loadItems();
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
      data: this.currentCompraObj.compraDetalleTabla.slice(this.skip, this.skip + this.pageSize),
      total: this.currentCompraObj.compraDetalleTabla.length
    };
  }

  backComponent(seccion, state) {

    this.nextSeccion = seccion;
    if (this.validarCambio == true) {
      this.routePadre = 'menu';
      openModal(state);
    }
    else {
      this.validarCambio = false;
      this.distribucionService.changeValidarCambio(this.validarCambio);
      this.router.navigate(['menu/' + this.nextSeccion]);
    }
  }

  routePadre: string;
  cambiarSeccion() {
    this.validarCambio = false;
    this.distribucionService.changeValidarCambio(this.validarCambio);
    this.router.navigate([this.routePadre + '/' + this.nextSeccion]);
  }

  inicializarCampos() {
    this.fCompra = this.currentCompraObj.fechaCompra;
    this.fEntrega = this.currentCompraObj.fechaEntrega;
    this.origenCompra = this.currentCompraObj.origenCompra;
    this.totalCompra = this.currentCompraObj.totalCompra;
    this.fleteCompra = this.currentCompraObj.costoFlete;
    this.eCompra = this.currentCompraObj.compraEstado;
    this.verificarchexbox();
  }

  verificarchexbox() {
    for (this.c = 0; this.c < this.currentCompraObj.compraDetalleTabla.length; this.c++) {      
      if (this.currentCompraObj.compraDetalleTabla[this.c].compraEstado == 1) {
        this.currentCompraObj.compraDetalleTabla[this.c].btnEstado = true;
      }
    }

  }

  guardarCambios() {
    this.currentCompraObj.compraDetalleTabla = this.currentCompraObj.compraDetalleTabla.filter(c => c.compraEstado == 1);

    //for (this.c = 0; this.c < this.currentCompraObj.compraDetalleTabla.length; this.c++) {
    //  if (this.currentCompraObj.compraDetalleTabla[this.c].compraEstado == 2) {
    //    this.currentCompraObj.compraDetalleTabla.splice(this.c, 1);
    //  }
    //}

    this.distribucionService.confirmarCompra(this.currentCompraObj).subscribe(
      res => {
        this.confirmModal('register');
        this.router.navigate(['menu/lista-compras/list']);
      },
      err => {
        console.log(err);
      }
    );

    this.distribucionService.getComprasAll();
    
  }

  c: number;

  btnDisabled: boolean = true;
  onChange(detalleCompraId: number) {
    this.btnDisabled = true;
    for (this.c = 0; this.c < this.currentCompraObj.compraDetalleTabla.length; this.c++) {
      if (this.currentCompraObj.compraDetalleTabla[this.c].detalleCompraId == detalleCompraId) {
        if (this.currentCompraObj.compraDetalleTabla[this.c].compraEstado == 2) {
          this.currentCompraObj.compraDetalleTabla[this.c].compraEstado = 1;
        } else {
          this.currentCompraObj.compraDetalleTabla[this.c].compraEstado = 2;
        }
      }      
    }
    for (this.c = 0; this.c < this.currentCompraObj.compraDetalleTabla.length; this.c++) {
      if (this.currentCompraObj.compraDetalleTabla[this.c].compraEstado == 1 && this.currentCompraObj.compraDetalleTabla[this.c].btnEstado != true) {
        this.btnDisabled = false;
      }
    }
  }

  openModal(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Confirmado", "El producto se confirmo", "", "", "", "");
  }

  dataTempSaldoAnterior: number = 0;
  cantidadOriginalTemp: number = 0;
  setValues(dataItem) {
    let valorTotal = 0;
    this.currentCompraObj.compraDetalleTabla.forEach(x => {
      if (x.detalleCompraId == dataItem.detalleCompraId) {
        this.distribucionService.getCompraSaldoAnterior(x.productId, x.proveedorId).subscribe(
          data => {
            this.dataTempSaldoAnterior = data;
            x.saldoDeposito = x.totalDeposito - x.precioCompra + this.dataTempSaldoAnterior;
          });
          x.precioCompra = x.cantidadCompra * x.precioUnitario;

      }
      valorTotal = valorTotal + x.precioCompra;
    });
    this.currentCompraObj.totalCompra = valorTotal;
    this.totalCompra = this.currentCompraObj.totalCompra;
    //this.currentCompraObj.compraDetalleTabla.forEach(x => {
    //  x.costoFleteItemCompra = this.currentCompraObj.costoFlete / (valorTotal / x.precioCompra);
    //});
  }
}

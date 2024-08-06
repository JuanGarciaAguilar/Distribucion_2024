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
import { Equivalencia } from '../../Shared/equivalencia';
import { debug, isNull } from 'util';
import { DISABLED } from '@angular/forms/src/model';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;


@Component({
  selector: 'app-edit-compras',
  templateUrl: './edit-compras.component.html',
  styleUrls: ['./edit-compras.component.css']
})
export class EditComprasComponent implements OnInit {
  nextSeccion: string;
  validarCambio: boolean = true;


  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }
  validarVista: boolean = true;
  currentCompraObj: Compra = new Compra();
  compraDetalleArray: CompraDetalle[] = [];

  //Datos generales de la compra
  idCompra: number;
  fCompra: Date;
  fEntrega: Date;
  origenCompra: string;
  totalCompra: number;
  fleteCompra: number;
  eCompra: number;

  productid: number;
  productum: string;
  cantidaddc: number;

  //Detalle de nueva compra
  proveedor: number;
  producto: number;
  cantidad: number = null;
  unidadMedida: string;
  peso: number = null;
  precioUnitario: number = null;
  precio: number = null;
  totalDeposito: number = null;
  saldoDeposito: number = null;
  fleteUnitario: number = null;
  //cantidadBuenEstado: number = null;
  //cantidadMalEstado: number = null;
  saldoAnterior: number = null;
  documentoCompra: string = null;
  //Arrays
  newCompra: Compra;
  newCompraDetalle: CompraDetalle;

  //ID visual, contador
  c: number = 0;
  i: number;

  fleteTempEdit: number = null;
  fleteTempNew: number = null;

  totalrows: number;
  public dataTempEquivalencia: any;
  public dataTempProducto: any;
  public dataTempProveedor: any;
  ngOnInit() {
    this.distribucionService.currentCompra.subscribe(c => { this.currentCompraObj = c });
    this.obtenerultimoid();
    this.currentCompraObj.compraDetalleTabla = this.currentCompraObj.compraDetalleTabla.filter(c => c.compraEstado > 0);
    this.cambiarestadoboton();

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

    this.distribucionService.getListaEquivalencia().subscribe(
      data => {
        this.dataTempEquivalencia = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.loadItems();
  }


  obtenerultimoid() {
    for (let i = 0; i < this.currentCompraObj.compraDetalleTabla.length; i++) {
      this.totalrows = this.currentCompraObj.compraDetalleTabla[i].detalleCompraId;
    }
  }

  cambiarestadoboton() {
    for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
      this.currentCompraObj.compraDetalleTabla[this.i].btnEstado = false;
    }
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
    this.idCompra = this.currentCompraObj.compraId;
    this.fCompra = this.currentCompraObj.fechaCompra;
    this.fEntrega = this.currentCompraObj.fechaEntrega;
    this.origenCompra = this.currentCompraObj.origenCompra;
    this.totalCompra = this.currentCompraObj.totalCompra;
    this.fleteCompra = this.currentCompraObj.costoFlete;
    this.eCompra = this.currentCompraObj.compraEstado;
  }

  addToDetallesArray() {
    this.fleteUnitario = this.fleteTempNew;
    if ((this.cantidad < 0 || this.cantidad != null) || (this.peso < 0 || this.peso != null)) {
      this.newCompraDetalle = new CompraDetalle;
      this.newCompraDetalle.detalleCompraId = this.totalrows + 1;
      this.totalrows = this.totalrows + 1;

      this.newCompraDetalle.proveedorId = this.proveedor;
      this.newCompraDetalle.productId = this.producto;
      if (this.cantidad == null) {
        this.newCompraDetalle.cantidadCompra = 0;
      }
      else {
        this.newCompraDetalle.cantidadCompra = parseInt(this.cantidad.toFixed(0));
      }
      this.newCompraDetalle.unidadMedida = this.unidadMedida;
      if (this.peso == null) {
        this.newCompraDetalle.pesoCompra = 0;
      }

      else {
        this.newCompraDetalle.pesoCompra = this.peso;
      }
      this.newCompraDetalle.precioUnitario = this.precioUnitario;
      this.newCompraDetalle.precioCompra = this.precio;
      this.newCompraDetalle.totalDeposito = this.totalDeposito;
      this.newCompraDetalle.saldoDeposito = this.saldoDeposito;
      this.newCompraDetalle.costoFleteItemCompra = this.fleteUnitario * this.cantidad;
      //if (this.cantidad > 0 || this.cantidad != null) {
      //  this.newCompraDetalle.cantidadBuenEstado = parseInt(this.cantidadBuenEstado.toFixed(0));
      //} else if (this.peso > 0 || this.peso != null) {
      //  this.newCompraDetalle.cantidadBuenEstado = parseFloat(this.cantidadBuenEstado.toFixed(2));
      //}
      //  this.newCompraDetalle.cantidadMalEstado = this.cantidadMalEstado;
      this.newCompraDetalle.documentoCompra = this.documentoCompra;
      this.newCompraDetalle.btnEstado = true;
      this.currentCompraObj.compraDetalleTabla.push(this.newCompraDetalle);
      if (this.precio != null) {
        this.currentCompraObj.totalCompra = this.currentCompraObj.totalCompra + this.precio;
        this.currentCompraObj.costoFlete = this.currentCompraObj.costoFlete + this.fleteUnitario * this.cantidad;
      }
      this.loadItems();
      this.cleanFields();
      this.updateBoxTotal();
      this.recalcularFleteUnitario();
      this.cambiarestadoboton();
    }
  }

  deleteDetalleFromArray(cdid) {
    for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
      if (this.currentCompraObj.compraDetalleTabla[this.i].detalleCompraId == cdid) {
        if (this.currentCompraObj.compraDetalleTabla[this.i].precioCompra != null) {
          this.currentCompraObj.totalCompra = this.currentCompraObj.totalCompra - this.currentCompraObj.compraDetalleTabla[this.i].precioCompra;
          this.currentCompraObj.costoFlete = this.currentCompraObj.costoFlete - this.currentCompraObj.compraDetalleTabla[this.i].costoFleteItemCompra;
        }
        if (this.currentCompraObj.compraDetalleTabla[this.i].btnEstado == true) {
          this.currentCompraObj.compraDetalleTabla.splice(this.i, 1);
        } else {
          this.currentCompraObj.compraDetalleTabla.splice(this.i, 1);
          this.distribucionService.deleteCompraProductoById(cdid).subscribe(
            data => {
              this.confirmModal('delete');
              //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
              //this.loadItems();
            },
            error => {
              //this.sharedDataService.sessionExpired(error);
            }
          );
        }
        this.loadItems();
        this.updateBoxTotal();
        this.recalcularFleteUnitario();
      }
    }
  }


  cleanFields() {
    this.proveedor = null;
    this.producto = null;
    this.cantidad = null;
    this.unidadMedida = null;
    this.peso = null;
    this.precioUnitario = null;
    this.precio = null;
    this.totalDeposito = null;
    this.saldoDeposito = null;
    this.fleteUnitario = null;
    //this.cantidadBuenEstado = null;
    //this.cantidadMalEstado = null;
    this.documentoCompra = null;
  }

  guardarCambios() {
    if (this.currentCompraObj.totalCompra > 0) {
      this.distribucionService.updateCompra(this.currentCompraObj).subscribe(
        data => {
          this.confirmModal('update');
          this.router.navigate(['menu/lista-compras/refresh']);
        },
        err => {
          console.log(err);
        }
      );
      this.distribucionService.getComprasAll();
    }
  }

  public dataTempSaldoAnterior: any;
  getSaldoAnterior() {
    if (this.producto != null && this.proveedor != null) {
      this.distribucionService.getCompraSaldoAnterior(this.producto, this.proveedor).subscribe(
        data => {
          this.dataTempSaldoAnterior = data;
          //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
          //this.loadItems();
        },
        error => {
          //this.sharedDataService.sessionExpired(error);
        }
      );
      this.totalDeposito = null;
    }
  }

  setSaldoAnterior() {
    this.saldoAnterior = this.dataTempSaldoAnterior;
  }

  setCostoTotalEditar(cdid, precioUdc) {
    for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
      if (this.currentCompraObj.compraDetalleTabla[this.i].detalleCompraId == cdid) {
        this.currentCompraObj.compraDetalleTabla[this.i].precioCompra = parseFloat((precioUdc * this.currentCompraObj.compraDetalleTabla[this.i].cantidadCompra).toFixed(2));
      }
    }
  }

  setCostoTotalEditarCantidad(cdid, cantidaddc) {
    for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
      if (this.currentCompraObj.compraDetalleTabla[this.i].detalleCompraId == cdid) {
        this.currentCompraObj.compraDetalleTabla[this.i].precioCompra = parseFloat((cantidaddc * this.currentCompraObj.compraDetalleTabla[this.i].precioUnitario).toFixed(2));
      }
    }
  }

  calcularSaldoeditar(cdid, preciodc, totaldc) {
    for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
      if (this.currentCompraObj.compraDetalleTabla[this.i].detalleCompraId == cdid) {
        if (totaldc == null) {
          this.currentCompraObj.compraDetalleTabla[this.i].saldoDeposito = parseFloat((0 - preciodc + this.saldoAnterior).toFixed(2));
        } else {
          this.currentCompraObj.compraDetalleTabla[this.i].saldoDeposito = parseFloat((totaldc - preciodc + this.saldoAnterior).toFixed(2));
        }
      }
    }

  }

  setCostoTotal(precioUnitario) {
    this.precio = precioUnitario * this.cantidad;
  }

  setCostoTotalCantidad(cantidad) {
    this.precio = this.precioUnitario * cantidad;
  }

  calcularSaldo(precio, totalDeposito) {
    if (totalDeposito == null) {
      this.saldoDeposito = parseFloat((0 - precio + this.saldoAnterior).toFixed(2));
    }
    else {
      this.saldoDeposito = parseFloat((totalDeposito - precio + this.saldoAnterior).toFixed(2));
    }
  }

  //calcularMalEstado() {
  //  //  if (this.cantidad > 0 && this.cantidad != null) {
  //  //    if (this.cantidadBuenEstado == null) {
  //  //      this.cantidadMalEstado = parseInt((this.cantidad - 0).toFixed(0));
  //  //    }
  //  //    else {
  //  //      this.cantidadMalEstado = parseInt((this.cantidad - this.cantidadBuenEstado).toFixed(0));
  //  //    }
  //  //  }
  //  //  else {
  //  //    if (this.cantidadBuenEstado == null) {
  //  //      this.cantidadMalEstado = this.peso - 0;
  //  //    }
  //  //    else {
  //  //      this.cantidadMalEstado = parseFloat((this.peso - this.cantidadBuenEstado).toFixed(2));
  //  //    }
  //  //  }
  //}

  recalcularFleteUnitario() {
    //if (this.currentCompraObj.totalCompra > 0) {
    //  this.currentCompraObj.compraDetalleTabla.forEach(x => {
    //    x.costoFleteItemCompra = (x.precioCompra / this.currentCompraObj.totalCompra) * this.currentCompraObj.costoFlete;
    //  });
    //}
  }


  updateBoxTotal() {
    this.totalCompra = this.currentCompraObj.totalCompra;
    this.fleteCompra = this.currentCompraObj.costoFlete;
  }



  closeMod(state) {
    closeModal(state);
  }

  compraDetId: number;
  envioCompraIdEl(cdid) {
    this.compraDetId = cdid;
  }

  openMod(state) {
    openModal(state);
  }

  equivalenciaFilter: Equivalencia[];

  obtenerEquivalencia(productid, unidadmedida) {
    this.equivalenciaFilter = [];
    for (let i = 0; i < this.dataTempEquivalencia.length; i++) {
      if (this.dataTempEquivalencia[i].productId == this.productid) {
        this.dataTempEquivalencia[i].bloq = false;
      } else {
        this.dataTempEquivalencia[i].bloq = true;
      }
    };
    this.dataTempEquivalencia.forEach(
      objSubcate => {
        if (objSubcate.productId == productid && objSubcate.unidadBase != unidadmedida) {
          this.equivalenciaFilter.push(objSubcate);
        }
      }
    );
  }

  envioCompraIdEd(cdid) {
    for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
      if (this.currentCompraObj.compraDetalleTabla[this.i].detalleCompraId == cdid) {
        if (this.currentCompraObj.compraDetalleTabla[this.i].btnEstado == false) {
          this.currentCompraObj.compraDetalleTabla[this.i].btnEstado = true;
          this.productid = this.currentCompraObj.compraDetalleTabla[this.i].productId;
          this.productum = this.currentCompraObj.compraDetalleTabla[this.i].unidadMedida;
          this.obtenerEquivalencia(this.productid, this.productum);
        } else {
          this.currentCompraObj.compraDetalleTabla[this.i].btnEstado = false;
        }

      }
    }
    
  }


  editToDetallesArray(cdid, cantidaddc, unidadMedidadc, precioUdc, preciodc, totaldc, saldodc, fletedc, documentodc) {
    fletedc = this.fleteTempEdit;
    if ((cantidaddc > 0 || cantidaddc != null)) {
      for (this.i = 0; this.i < this.currentCompraObj.compraDetalleTabla.length; this.i++) {
        if (this.currentCompraObj.compraDetalleTabla[this.i].detalleCompraId == cdid) {
          this.currentCompraObj.compraDetalleTabla[this.i].cantidadCompra = cantidaddc;
          this.currentCompraObj.compraDetalleTabla[this.i].unidadMedida = unidadMedidadc;
          this.currentCompraObj.compraDetalleTabla[this.i].precioUnitario = parseFloat(precioUdc);
          this.currentCompraObj.compraDetalleTabla[this.i].precioCompra = parseFloat(preciodc);
          this.currentCompraObj.compraDetalleTabla[this.i].totalDeposito = totaldc;
          this.currentCompraObj.compraDetalleTabla[this.i].saldoDeposito = saldodc;
          this.currentCompraObj.compraDetalleTabla[this.i].costoFleteItemCompra = fletedc * cantidaddc;
          this.currentCompraObj.compraDetalleTabla[this.i].documentoCompra = documentodc;
        }

      }
      if (this.currentCompraObj.compraDetalleTabla.length > 1) {
        this.currentCompraObj.totalCompra = 0;
        this.currentCompraObj.costoFlete = 0;
          for (let x = 0; x < this.currentCompraObj.compraDetalleTabla.length; x++) {
            let totalcompraanteriores = this.currentCompraObj.compraDetalleTabla[x].precioCompra;
            this.currentCompraObj.totalCompra = totalcompraanteriores + (this.currentCompraObj.totalCompra);
            let totalfleteanteriores = this.currentCompraObj.compraDetalleTabla[x].costoFleteItemCompra;
            this.currentCompraObj.costoFlete = totalfleteanteriores + (this.currentCompraObj.costoFlete);
          }
      } else {
        this.currentCompraObj.totalCompra = parseFloat(preciodc);
        this.currentCompraObj.costoFlete = parseFloat(fletedc) * parseFloat(cantidaddc);
      }

      this.cleanFields();
      this.envioCompraIdEd(cdid);
      this.updateBoxTotal();
      this.recalcularFleteUnitario();
    }

  }

  confirmModal(opcion) {
    confirmModal(opcion, "", "", "Actualizado", "La compra se actualizo correctamente", "Eliminado", "El producto se elimino correctamente.");
  }


  public compraeditKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  public loadItems(): void {
    this.compraeditKendo = {
      data: this.currentCompraObj.compraDetalleTabla.slice(this.skip, this.skip + this.pageSize),
      total: this.currentCompraObj.compraDetalleTabla.length
    };
  }

  
}

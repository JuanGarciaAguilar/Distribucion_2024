import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Producto } from '../../Shared/Producto';
import { Equivalencia } from '../../Shared/equivalencia';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';
declare function checkLabel(id: string): any;
declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-det',
  templateUrl: './det.component.html',
  styleUrls: ['./det.component.css']
})
export class DetComponent implements OnInit {

  constructor(public distribucionService: DistribucionService,private router : Router) { }

  compraObj: Compra;
  compraDetalleArray: CompraDetalle[] = [];
  equivalenciaFilter: Equivalencia[];

  //Detalle de nueva compra
  proveedor: number;
  producto: number;
  unidadMedida: string;
  cantidad: number;
  peso: number;
  precio: number;
  fleteUnit: number = 0;
  precioUnitario: number;
  totalDeposito: number;
  saldoDeposito: number;
  fleteUnitario: number;
  saldoAnterior: number;
  documentoCompra: string;
  totalCompra: number;

  //Arrays
  newCompra: Compra;
  newCompraDetalle: CompraDetalle;

  //ID visual, contador
  c: number = 0;
  i: number;

  //frm
  disabled: boolean = true;
  IDEliminar: number = 0;
  public dataTempProducto: any;
  public dataTemProveedor: any;
  public dataTempEquivalencia: any;
  ngOnInit() {
    this.disabled;
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProducto = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.distribucionService.getProveedoresAll().subscribe(
      data => {
        this.dataTemProveedor = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.distribucionService.getListaEquivalencia().subscribe(
      data => {
        this.dataTempEquivalencia = data.filter(x => x.estado == true);
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
    this.distribucionService.currentCompra.subscribe(c => this.newCompra = c);
    if (this.newCompra.compraDetalleTabla == null) {
      this.newCompra.compraDetalleTabla = [];
    } else {
      this.loadItems();
    }
  }

  obtenerFleteUnitario() {
    this.dataTempEquivalencia.forEach(x => {
      if (x.productId == this.producto) {
        this.fleteUnit = x.fleteUnitario;
      }
    });
    this.subirlbl('txtFleteUnit');
  }

  calcularCostoTotal() {
    if (this.precioUnitario == null || this.cantidad == null || this.precioUnitario.toString() == "" || this.cantidad.toString() == "") {
      this.precio == Math.round(this.precioUnitario * 0);
    }
    else {
      this.precio = Math.round(this.precioUnitario * this.cantidad);
      this.setSaldoAnterior();
      this.calcularSaldo();
    }
  }

  validacion() {
    if (this.cantidad > 0 && this.cantidad % 1 == 0) {
      if (this.proveedor > 0 && this.producto > 0 && this.precioUnitario > 0 && this.precio > 0 && this.totalDeposito > 0 && this.unidadMedida != null //&& this.cantidadBuenEstado > 0 && this.cantidadBuenEstado % 1 == 0
      ) {
        this.disabled = false;
      }
      else {
        this.disabled = true;
      }
    }
    else {
      if (this.peso > 0) {
        if (this.proveedor > 0 && this.producto > 0 && this.precio > 0 && this.precioUnitario > 0 && this.totalDeposito > 0 && this.unidadMedida != null //&& this.cantidadBuenEstado > 0
        ) {
          this.disabled = false;
        }
        else {
          this.disabled = true;
        }
      }
      else {
        this.disabled = true;
      }
    }
  }

  cleanFields() {
    this.proveedor= null;
    this.producto = null;
    this.unidadMedida = null;
    this.cantidad = null;
    this.peso = null;
    this.precioUnitario = null;
    this.precio = null;
    this.saldoAnterior = null;
    this.totalDeposito = null;
    this.saldoDeposito = null;
    this.fleteUnitario = null;
    this.fleteUnit = 0;
    this.documentoCompra = null;
  }

  addToDetallesArray() {
    if (this.newCompra.compraDetalleTabla.length > 0) {
      this.newCompra.compraDetalleTabla.forEach(x => {
        this.c = x.detalleCompraId;
      });
    }     
    this.newCompraDetalle = new CompraDetalle;
    this.newCompraDetalle.detalleCompraId = this.c + 1;
    
    this.newCompraDetalle.proveedorId = this.proveedor;
    this.newCompraDetalle.productId = this.producto;
    this.newCompraDetalle.unidadMedida = this.unidadMedida;
    if (this.cantidad == null) {
      this.newCompraDetalle.cantidadCompra = 0;
    }
    else {
      this.newCompraDetalle.cantidadCompra = parseInt(this.cantidad.toFixed(0));
    }
    if (this.peso == null) {
      this.newCompraDetalle.pesoCompra = 0;
    }
    else {
      this.newCompraDetalle.pesoCompra = this.peso;
    }
    this.newCompraDetalle.precioCompra = this.precio;
    this.newCompraDetalle.precioUnitario = this.precioUnitario;
    this.newCompraDetalle.totalDeposito = this.totalDeposito;
    this.newCompraDetalle.saldoDeposito = this.saldoDeposito;
    this.newCompraDetalle.compraEstado = 2;
    
    this.newCompraDetalle.costoFleteItemCompra = this.cantidad * this.fleteUnit;
    this.newCompraDetalle.documentoCompra = this.documentoCompra;
    
    this.newCompra.compraDetalleTabla.push(this.newCompraDetalle);
    if (this.newCompra.totalCompra == null) {
      this.newCompra.totalCompra = this.precio;
      this.newCompra.costoFlete = this.fleteUnit * this.cantidad;
    }
    else {
      this.newCompra.totalCompra = this.newCompra.totalCompra + this.precio;
      this.newCompra.costoFlete = this.newCompra.costoFlete + this.fleteUnit * this.cantidad;
    }
    this.loadItems();
    this.cleanFields();
    this.c = this.c + 1;
    this.disabled = true;
  }


  public compradetKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.compradetKendo = {
      data: this.newCompra.compraDetalleTabla.slice(this.skip, this.skip + this.pageSize),
      total: this.newCompra.compraDetalleTabla.length
    };
  }

  deleteDetalleFromArray(id) {
    for (this.i = 0; this.i < this.newCompra.compraDetalleTabla.length; this.i++) {
      if (this.newCompra.compraDetalleTabla[this.i].detalleCompraId == id) {
        this.newCompra.totalCompra = this.newCompra.totalCompra - this.newCompra.compraDetalleTabla[this.i].precioCompra;
        this.newCompra.compraDetalleTabla.splice(this.i, 1);
        this.confirmModal('delete');
        this.loadItems();
      }
    }
  }
  public dataTempSaldoAnterior: any;
  getSaldoAnterior() {
    if (this.producto != null && this.proveedor != null) {
      this.distribucionService.getCompraSaldoAnterior(this.producto, this.proveedor).subscribe(
        data => {
          this.dataTempSaldoAnterior = data;
        },
        error => {
        }
      );
      this.precio = null;
      this.saldoAnterior = null;
      this.totalDeposito = null;
      this.saldoAnterior = null;
    }
  }

  obtenerEquivalencia(){
    if (this.producto != null) {
      this.equivalenciaFilter = [];
      for (let i = 0; i < this.dataTempEquivalencia.length; i++) {
        if (this.dataTempEquivalencia[i].productId == this.producto) {
          this.dataTempEquivalencia[i].bloq = false;
        } else {
          this.dataTempEquivalencia[i].bloq = true;
        }
      };
      this.dataTempEquivalencia.forEach(
        objSubcate => {
          if (objSubcate.productId == this.producto) {
            this.equivalenciaFilter.push(objSubcate);
          }
        }
      );
    }
  }

  setSaldoAnterior() {
    this.saldoAnterior = this.dataTempSaldoAnterior;
    if (this.saldoAnterior == 0) {
      this.saldoAnterior = null;
    }
  }

  calcularSaldo() {
    if (this.totalDeposito == null) {
      this.saldoDeposito = parseFloat((0 - this.precio + this.saldoAnterior).toFixed(2));
    }
    else {
      this.saldoDeposito = parseFloat((this.totalDeposito - this.precio + this.saldoAnterior).toFixed(2));
    }
  }

  backComponent() {
   this.distribucionService.changeCompra(this.newCompra);
    this.router.navigate(['menu/reg-compras/cab']);
  }

  nextComponent() {
    this.newCompra.costoFlete = 0;
    this.newCompra.compraDetalleTabla.forEach(x => {
      this.newCompra.costoFlete = this.newCompra.costoFlete + x.costoFleteItemCompra
    });
    this.distribucionService.changeCompra(this.newCompra);
    this.router.navigate(['menu/reg-compras/res']);
  }

  pasaDatos(IDEliminar) {
    
    this.IDEliminar = IDEliminar;
    this.newCompra.costoFlete = 0;
  }


  openMod(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "La compra se realizo correctamente.", "Actualizado", "La compra se actualizo correctamente.", "Eliminado", "El producto se elimino correctamente.");
  }

  txtClass: string;
  checkInput(input) {
    if (input == '' || input == null) {
      this.txtClass = '';
    } else {
      this.txtClass = 'active';
    }
  }

  subirlbl(id) {
    checkLabel(id);
  }

}

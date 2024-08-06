import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Producto } from '../../Shared/Producto';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../Shared/Usuario';

import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-res',
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.css']
})
export class ResComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router) { }

  //Datos generales de la compra
  fCompra: Date;
  fEntrega: Date;
  origenCompra: string;
  totalCompra: number;
  fleteCompra: number;

  //Detalle de nueva compra
  proveedor: number;
  producto: number;
  cantidad: number;
  unidadMedida: number;
  peso: number;
  precio: number;
  totalDeposito: number;
  saldoDeposito: number;
  fleteUnitario: number;
  //cantidadBuenEstado: number;
  //cantidadMalEstado: number;

  //Arrays
  newCompra: Compra;
  newCompraDetalle: CompraDetalle;

  //ID visual, contador
  c: number = 0;
  public dataTempProducto: any;
  public dataTemProveedor: any;

  usuarioV = new Usuario();

  ngOnInit() {
    this.distribucionService.currentCompra.subscribe(c => this.newCompra = c);
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProducto = data;
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.distribucionService.getProveedoresAll().subscribe(
      data => {
        this.dataTemProveedor = data;
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      });
    this.loadItems();
    this.inicializarCampos();
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

  inicializarCampos() {
    this.fCompra = this.newCompra.fechaCompra;
    this.fEntrega = this.newCompra.fechaEntrega;
    this.origenCompra = this.newCompra.origenCompra;
    this.totalCompra = this.newCompra.totalCompra;
    this.fleteCompra = this.newCompra.costoFlete;
  }

  backComponent() {
    this.router.navigate(['menu/reg-compras/det']);
  }


  submitCompra() {
    this.usuarioV = JSON.parse(sessionStorage.getItem('user'));
    this.newCompra.usuarioId = this.usuarioV.userID;
    this.distribucionService.insertNewCompra(this.newCompra).subscribe(
      res => {
        this.confirmModal('register');
        this.router.navigate(['menu/reg-compras/cab']);
      },
      err => {
        console.log(err);
      }

    );
    this.distribucionService.changeCompra(new Compra);
  }

  openModal(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "La compra se realizo correctamente.", "Actualizado", "La compra se actualizo correctamente.", "Eliminado", "El producto se elimino correctamente.");
  }

}

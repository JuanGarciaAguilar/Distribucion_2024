import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Gasto } from '../../Shared/gasto';
import { GastoDetalle } from '../../Shared/gasto-detalle';

import { Subject } from 'rxjs/Subject'
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Compra } from '../../Shared/compra';
import { CompraDetalle } from '../../Shared/compra-detalle';

import { Estados } from '../../Shared/Estados';
import { EstadoDetalle } from '../../Shared/estado-detalle';
declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;


@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.css']
})
export class ListAllComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router) { }

  currentCompraObj: Compra;
  c: number = 0;
  i: number;
  idBorrar: number;
  public compra: any;
  public comprafil: any;
  estado;
  estadodetalle;
  estados: Estados[] = [];

  estadocompra: number;

  ngOnInit() {
    this.distribucionService.currentCompra.subscribe(c => this.currentCompraObj = c)
    this.distribucionService.getComprasAll().subscribe(
      data => {
        this.compra = data;

        for (let i = 0; i < this.compra.length; i++) {

          this.compra[i].index = i;

          this.estados = [];

          for (let c = 0; c < this.compra[i].compraDetalleTabla.length; c++) {

            if (this.compra[i].compraDetalleTabla[c].compraEstado > 0) {
              this.estadocompra = this.compra[i].compraDetalleTabla[c].compraEstado;

              this.estado = new Estados();
              this.estadodetalle = new EstadoDetalle();
              this.estadodetalle.Estadodt = this.estadocompra;
              this.estado.estadodtId = this.estadodetalle;

              if (this.estados.length < 1) {
                this.estados.push(this.estado);
              } else {
                if (this.estados[0].estadodtId.Estadodt != this.estadocompra) {
                  this.estados[1] = this.estado;
                }
              }
            }
          }

          if (this.estados.length == 2) {
            this.compra[i].compraStatus = "Recibido Parcialmente";
            this.compra[i].btnEstado = true;
            this.compra[i].compraEstado = 1;
            }else if (this.estados.length == 1){
                if (this.estados[0].estadodtId.Estadodt == 1) {
                  this.compra[i].compraStatus = "Recibido Completamente";
                  this.compra[i].btnEstado = true;
                } else {
                  this.compra[i].compraStatus = "Nuevo";
                  this.compra[i].btnEstado = false;
                }
                this.compra[i].compraEstado = 1;
          } else {
            this.compra[i].compraEstado = 0;
            } 
        }

        this.compra = this.compra.filter(e => e.compraEstado == 1);

        this.loadItems();
        
      },
      error => {
        console.log("Error compras" + error);
        //this.sharedDataService.sessionExpired(error);
      }

    );

  }

  onChange(detalleCompraId: number) {

  }

  public compraKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
  public loadItems(): void {
    this.compraKendo = {
      data: this.compra.slice(this.skip, this.skip + this.pageSize),
      total: this.compra.length
    };
  }

  guardarIdBorrar(id) {
    this.idBorrar = id;
  }

  deleteCompra(id) {
    this.distribucionService.deleteCompraById(id).subscribe(
      data => {
        this.confirmModal('delete');
        this.ngOnInit();
      },
      error => {
      }
    );
  }


  goToDetalleCompra(c: Compra) {
    this.distribucionService.changeCompra(c);
    this.router.navigate(['menu/lista-compras/edit']);
  }

  goToVerificarCompra(c: Compra) {
    this.distribucionService.changeCompra(c);
    this.router.navigate(['menu/lista-compras/verificar']);
  }


  openModal(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }
  confirmModal(opcion) {
    confirmModal(opcion, "", "", "", "", "Eliminado", "La compra se elimino correctamente.");
  }
}

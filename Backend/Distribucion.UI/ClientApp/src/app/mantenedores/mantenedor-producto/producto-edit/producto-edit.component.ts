import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';


import { NgModule } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { forEach } from '@angular/router/src/utils/collection';

import { Equivalencia } from '../../../Shared/equivalencia';
import { DistribucionService } from '../../../Shared/distribucion.service';
import { Producto } from '../../../Shared/Producto';


import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle:string, rText:string, uTitle:string, uText:string, dTitle:string, dText:string): any;

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {

  public productDetail: Producto[];
  public listaequivalencia: any;
  public equivalenciaproductoDetail: any;
  currentProductoObj: Producto = new Producto();

  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder: FormBuilder) { }

  idProd: number;
  nomProd: string;
  idProdDet: number = 1;
  uMedida: string;
  cantObj: number;
  fleteUnit: number;
  frm: FormGroup;
  prodDet: Equivalencia;
  addArrayValidator: boolean = true;

  ngOnInit() {
    this.distribucionService.currentProducto.subscribe(p => { this.currentProductoObj = p });
    this.idProd = this.currentProductoObj.productId;
    this.nomProd = this.currentProductoObj.productName;
    this.distribucionService.getListaEquivalencia().subscribe(
      data => {
        this.listaequivalencia = data;        
        this.equivalenciaproductoDetail = data.filter(x => x.estado == true);
        for (let i = 0; i < this.equivalenciaproductoDetail.length; i++) {
          this.equivalenciaproductoDetail[i].bloq = true;
          this.equivalenciaproductoDetail[i].opcion = 1;
        }
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
    this.getProducts(this.idProd);
    this.frm = this.formBuilder.group({
      productN: [null, [Validators.required]]
    });

  }

  getProducts(idProd: number) {
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.productDetail = data as Producto[];
        this.productDetail = this.productDetail.filter(p => p.productParentId === idProd);
        this.loadItems();
      },
      err => {
        console.error(err)
      }
    );
  }
  
  public productDetailKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.productDetailKendo = {
      data: this.productDetail.slice(this.skip, this.skip + this.pageSize),
      total: this.productDetail.length
    };
  }



  public productEditDetailKendo: GridDataResult;
  public pageSizeEdit: number = 4;
  public skipEdit: number = 0;
  private dataEdit: Object[];

  public pageChangeEdit(event: PageChangeEvent): void {
    this.skipEdit = event.skip;
    this.loadItemsEdit();
  }

  private loadItemsEdit(): void {
    this.productEditDetailKendo = {
      data: this.equivalenciaproductotabla.slice(this.skipEdit, this.skipEdit + this.pageSizeEdit),
      total: this.equivalenciaproductotabla.length
    };
  }
  
    totalrows: number;
  obtenerultimoid(idProducto) {
    for (let i = 0; i < this.listaequivalencia.length; i++) {
      if (this.listaequivalencia[i].productId == idProducto) {
        this.totalrows = this.listaequivalencia[i].equivalenciaId;
      }
    }
  }

 AgregarProducto() {
    try {
      this.producto.productParentId = this.idProd;
      this.distribucionService.postInsertaProducto(this.producto).subscribe(
          res => {
            if (res != 0) {
              setTimeout(() => { this.visible = false; }, 2000); this.content = "Ya se encuentra registrado el Producto"; this.level = "danger"; this.visible = true;
            } else {
               this.confirmModal('register');
              this.ngOnInit();
            }
          },
          err => {
            console.log(err);
          }
        );     
    } catch (e) {
      console.log(e);
    }
  }

  producto = new Producto();
  idProduc: number=0;
  pPadre: boolean;
  envioID(productId, padre) {    
    this.idProduc = productId;
    this.pPadre = padre;
    this.producto.productName = null;
    this.producto.unidadMedidad = null;
  }

  Eliminar(idProducto) {
      this.distribucionService.postEliminaProducto(idProducto).subscribe(
        data => {
          this.confirmModal('delete');
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      ); 
  }

  idEProd: number;
  nombEProd: string;
  uMedidaE: string;
  parId: number;
  estadoPr: string;
  public equivalenciaproductotabla: any;
 
  enviarEditarProducto(idProducto, nameProducto) {
    try {
      this.idEProd = null;
      this.nombEProd = null;
      this.equivalenciaproductotabla = [];
      this.equivalenciaproductotabla = this.equivalenciaproductoDetail.filter(p => p.productId === idProducto);
      if (this.equivalenciaproductotabla.length < 1) {
        this.idEProd = idProducto;
        this.nombEProd = nameProducto;
        this.equivalenciaproductotabla = [];
        this.estadoPr = 'new';
        this.openMod('modal-ed-productos');
      }else {        
        this.equivalenciaproductotabla;
        this.idEProd = idProducto;
        this.nombEProd = nameProducto;
        this.obtenerultimoid(idProducto);
        this.estadoPr = 'old';
        this.openMod('modal-ed-productos');
      }
      this.loadItemsEdit();
    } catch (e) {
      console.log(e);
    }
  }

  verificarnombre(NombreProducto) {
    for (var c = 0; c < this.productDetail.length; c++) {
      if (this.productDetail[c].productName == NombreProducto) {
        this.noDuplicate = false;
      }
    }
  }


  verificarDuplicado(idProducto, NombreProducto) {
    this.noDuplicate = true;
    for (var i = 0; i < this.productDetail.length; i++) {
      if (this.productDetail[i].productId == idProducto) {
        if (this.productDetail[i].productName == NombreProducto) {
          this.editarProducto(idProducto, NombreProducto);
        } else {
          this.verificarnombre(NombreProducto);
          if (this.noDuplicate) {
            this.editarProducto(idProducto, NombreProducto);
          } else {
            setTimeout(() => { this.visible = false; }, 2000); this.content = "Ya se encuentra registrado el Producto"; this.level = "danger"; this.visible = true;
          }
        }
      }
    }
  }


  productoE;
  editarProducto(idProducto, NombreProducto) {
    this.productoE = new Producto();
    this.productoE.productId = this.idEProd;
    this.productoE.productName = NombreProducto;
    this.productoE.productImage = '';
    this.productoE.unidadMedidad = '';
    this.productoE.productParentId = 0;
    this.productoE.productLevel = 0;
    this.productoE.equivalenciaDetalleTabla = this.equivalenciaproductotabla;
    this.distribucionService.postActualizaProducto(this.productoE).subscribe(
      data => {
        this.closeMod('modal-ed-productos');
        this.confirmModal('update');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }

  cancelar() {
    this.idEProd = null;
    this.nombEProd = null;
    this.equivalenciaproductotabla = [];
    this.uMedida = null;
    this.cantObj = null;
  }

  content: string;
  level: string;
  visible: boolean = false;

  noDuplicate: boolean = true;

  unidadmedida: string;
  verificarduplicado(unidadmedida) {
    this.unidadmedida = unidadmedida;
    this.noDuplicate = true;
    for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
      if (this.equivalenciaproductotabla[i].unidadBase == this.unidadmedida) {
        this.noDuplicate = false;
        setTimeout(() => { this.visible = false; }, 3000);
        this.content = "Unidad Medida Existente";
        this.level = "danger";
        this.visible = true;
      }
    }
  }


  x: number = 0;
  addToDetallesArray(estadopr) {
    this.verificarduplicado(this.uMedida);
    if (this.noDuplicate) {
      this.prodDet = new Equivalencia;
      this.prodDet.productId = this.idEProd;
      if (estadopr == 'new') {
        
        this.prodDet.equivalenciaId = ++this.x;

        this.prodDet.unidadBase = this.uMedida;
        this.prodDet.cantidadObjetos = this.cantObj;
        this.prodDet.bloq = true;
        this.prodDet.fleteUnitario = this.fleteUnit;
        this.equivalenciaproductotabla.push(this.prodDet);
        this.cleanFields();
      } else {
        this.prodDet.equivalenciaId = this.totalrows + 1;
        this.totalrows = this.totalrows + 1;

        this.prodDet.unidadBase = this.uMedida;
        this.prodDet.cantidadObjetos = this.cantObj;
        this.prodDet.bloq = true;
        this.prodDet.fleteUnitario = this.fleteUnit;
        this.equivalenciaproductotabla.push(this.prodDet);
        this.cleanFields();
        this.addArrayValidator = true;
      }
    }
    this.loadItemsEdit();
  }

  cleanFields() {
    this.uMedida = null;
    this.cantObj = null;
    this.fleteUnit = null;
  }

  editarEquivalencia(idEquivalencia) {
    for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
      if (this.equivalenciaproductotabla[i].equivalenciaId == idEquivalencia) {
        if (this.equivalenciaproductotabla[i].bloq == false) {
          this.equivalenciaproductotabla[i].bloq = true;
        } else {
          this.equivalenciaproductotabla[i].bloq= false;
        }

      }
    }
  }


  editToDetallesArray(idEquivalencia, unidadbase, cantidadobjetos) {
    for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
      if (this.equivalenciaproductotabla[i].equivalenciaId == idEquivalencia) {
        if (this.equivalenciaproductotabla[i].unidadBase == unidadbase && this.equivalenciaproductotabla[i].cantidadObjetos == cantidadobjetos) {
          this.editarEquivalencia(idEquivalencia);
        } else if (this.equivalenciaproductotabla[i].unidadBase == unidadbase && this.equivalenciaproductotabla[i].cantidadObjetos != cantidadobjetos){
          this.equivalenciaproductotabla[i].unidadBase = unidadbase;
          this.equivalenciaproductotabla[i].cantidadObjetos = cantidadobjetos;
          this.editarEquivalencia(idEquivalencia);
        }else {
          this.verificarduplicado(unidadbase);
          if (this.noDuplicate) {
            for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
              if (this.equivalenciaproductotabla[i].equivalenciaId == idEquivalencia) {
                this.equivalenciaproductotabla[i].unidadBase = unidadbase;
                this.equivalenciaproductotabla[i].cantidadObjetos = cantidadobjetos;
              }
            }
            this.editarEquivalencia(idEquivalencia);
          }
        }
      }
    }
  }

  eliminarEquivalencia(idEquivalencia) {
    try {
      for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
        if (this.equivalenciaproductotabla[i].equivalenciaId == idEquivalencia) {
          if (this.equivalenciaproductotabla[i].opcion !=1) {
            this.equivalenciaproductotabla.splice(i, 1);
            this.loadItemsEdit();
          } else {
            this.equivalenciaproductotabla.splice(i, 1);
            this.distribucionService.postEliminarEquivalencia(idEquivalencia).subscribe(
              data => {
                //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
                this.loadItemsEdit();
              },
              error => {
                //this.sharedDataService.sessionExpired(error);
              }
            );
          }
          //this.equivalenciaproductotabla.splice(i, 1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  verificarCamposLlenosEditar() {
    if (this.uMedida != "" && this.uMedida != null && this.cantObj > 0 && this.cantObj != null && this.fleteUnit > 0 && this.fleteUnit != null) {
      this.addArrayValidator = false;
    }
  }

    openMod(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "El producto se registro correctamente.", "Actualizado", "El producto se actualizo correctamente.", "Eliminado", "El producto se elimino correctamente.");
  }
}

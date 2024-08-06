import { Component, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { Producto } from '../../../Shared/Producto';
import { DistribucionService } from '../../../Shared/distribucion.service';
import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { forEach } from '@angular/router/src/utils/collection';
import { debug } from 'util';
import { Equivalencia } from '../../../Shared/equivalencia';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private formBuilder: FormBuilder, private router: Router) { }

  estado = 'Agregar';
  clase = 'primary';
  producto = new Producto();
  @ViewChild("productN") inputEl: ElementRef;

  searchString: string = '';
  lproducto: Producto[];
  subcategoria: Producto[] = [];
  selectedRows: any[];

  idProd: number;
  nomProd: string;

  prodCategoria: Producto;

  frm: FormGroup;

  ngOnInit() {
    this.getProducts();
    this.producto.productParentId = -1;
    this.frm = this.formBuilder.group({
      productN: [null, [Validators.required]]
    });
  }
  content: string;
  level: string;
  visible: boolean = false;
  noDuplicate: boolean = true;

  AgregarCategoria() {
    try {
      if (this.producto.productId == 0 || this.producto.productId == null) {
        this.distribucionService.postInsertaCategoria(this.producto).subscribe(
          res => {
            if (res != 0) {
              setTimeout(() => { this.visible = false; }, 2000); this.content = "Ya se encuentra registrado la Categoria"; this.level = "danger"; this.visible = true;
            } else {
              this.confirmModal('register');
              this.ngOnInit();
            }
          },
          err => {
            console.log(err);
          }
        );
      } else{
        this.noDuplicate = true;
        for (let i = 0; i < this.dataTempProduct.length; i++) {
          if (this.dataTempProduct[i].productId == this.producto.productId) {
            if (this.dataTempProduct[i].productName == this.producto.productName) {
              this.noDuplicate = false;
              this.Cancelar();
            }
          }
        }
        if (this.noDuplicate) {
          this.distribucionService.postActualizaCategoria(this.producto).subscribe(
            res => {
              if (res != 0) {
                setTimeout(() => { this.visible = false; }, 2000); this.content = "Ya se encuentra registrado la Categoria"; this.level = "danger"; this.visible = true;
              } else {
                this.confirmModal('update');
                this.ngOnInit();
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  ocultarMensaje() {
    this.visible = false
  }

  Editar(id, nombre) {
    try {
      this.producto.productId = id;
      this.producto.productName = nombre;
      this.inputEl.nativeElement.focus()
    } catch (e) {
      console.log(e);
    }

  }

  idCateg: number;
  nCateg: string;
  envioID(categoria, nombre) {
    this.idCateg = categoria;
    this.nCateg = nombre;
  }

  Eliminar(idProducto) {
      this.distribucionService.postEliminaCategoria(idProducto).subscribe(
        data => {
          this.confirmModal('delete');
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
  }
  //-----Eliminar

  Cancelar() {
    this.producto.productId = 0;
    this.producto.productName = null;
    this.producto.productParentId = 1;
    this.producto.unidadMedidad = null;
    this.estado = 'Agregar';
    this.clase = 'primary';
  }

  txtClass: string;
  checkInput(input) {
    if (input != null) {
      this.txtClass = 'active';
    } else {
      this.txtClass = '';
    }
  }

  public dataTempProduct: any;
  getProducts() {
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProduct = data;
        this.dataTempProduct = this.dataTempProduct.filter(p => p.productParentId === 0);
        this.dataTempProduct = this.dataTempProduct.filter(p => p.productName != "NONProduct");
        this.loadItems();
      },
      error => {
        console.error(error);
      }

    );
  }
  
  public productoKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.productoKendo = {
      data: this.dataTempProduct.slice(this.skip, this.skip + this.pageSize),
      total: this.dataTempProduct.length
    };
  }

  openModal(state) {
    openModal(state);
  }

  closeModal(state) {
    closeModal(state);
  }

  c: number = 0;

  addToSubcategoriaArray() {
    this.prodCategoria = new Producto;
    this.prodCategoria.productId = ++this.c;
    this.prodCategoria.productName = this.nomProd;
    this.subcategoria.push(this.prodCategoria);
    this.cleanFields();
  }

  cleanFields() {
    this.nomProd = null;

  }

  eliminarProducto(id) {
    try {
      for (var i = 0; i < this.subcategoria.length; i++) {
        if (this.subcategoria[i].productId == id) {
          this.subcategoria.splice(i, 1);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  goToDetalleProducto(p: Producto) {
    this.distribucionService.changeProducto(p);
    this.router.navigate(['menu/mantenedores/producto/edit']);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "La categoria se registro correctamente.", "Actualizado", "La categoria se actualizo correctamente.", "Eliminado", "La categoria se elimino correctamente.");
  }

}


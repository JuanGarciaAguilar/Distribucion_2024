//import { Component, OnInit, Input,Output, ElementRef, ViewChild} from '@angular/core';
//import { Producto } from '../Shared/Producto';
//import { DistribucionService } from '../Shared/distribucion.service';
//import { NgModel, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { NgModule } from '@angular/core';
//import { Subject } from 'rxjs/Subject';
//import { forEach } from '@angular/router/src/utils/collection';
//import { debug } from 'util';
//import { Equivalencia } from '../Shared/equivalencia';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';


//declare function openModal(state: string): any;
//declare function closeModal(state: string): any;

//@Component({
//  selector: 'app-producto',
//  templateUrl: './producto.component.html',
//  styleUrls: ['./producto.component.css']
//})
//export class ProductoComponent implements OnInit {

//  constructor(public distribucionService: DistribucionService, private formBuilder: FormBuilder, private router: Router) { }

//  estado = 'Agregar';
//  clase = 'primary';
//  producto = new Producto();



//  searchString: string = '';
//  lproducto: Producto[];
//  subcategoria: Producto[] = [];
//  selectedRows: any[];

//  idProd: number;
//  nomProd: string;
//  //idProdDet: number = 1;
//  //uMedida: string;
//  //cantObj: number;

//  prodCategoria: Producto;
//  //prodDet: Equivalencia;
//  //equivalenciaDetalleArray: Equivalencia[] = [];
  

//  frm: FormGroup;
//  frmP: FormGroup;

//  ngOnInit() {
//    this.getProducts();
//    this.producto.productParentId = -1;
//    this.frm = this.formBuilder.group({
//      productN: [null, [Validators.required]]
//    });
//    this.frmP = this.formBuilder.group({
//      nomProd: [null, [Validators.required]],
//    });
//  }
//  content: string;
//  level: string;
//  visible: boolean = false;
//  noDuplicate: boolean = true;

//  AgregarCategoria() {
//    try {
//      if (this.producto.productId == 0 || this.producto.productId == null) {
//        this.distribucionService.postInsertaCategoria(this.producto).subscribe(
//          res => {
//            if (res != 0) {
//              setTimeout(() => { this.visible = false; }, 2000); this.content = "Ya se encuentra registrado la Categoria"; this.level = "danger"; this.visible = true;
//            } else {
//              setTimeout(() => { this.visible = false; }, 2000); this.content = "Categoria nuevo agregado correctamente."; this.level = "success"; this.visible = true;
//              this.ngOnInit();
//            }
//          },
//          err => {
//            console.log(err);
//          }
//        );
//      } else if (this.producto.productId > 0) {
//        this.noDuplicate = true;
//        for (let i = 0; i < this.dataTempProduct.length; i++) {
//          if (this.dataTempProduct[i].productId == this.producto.productId) {
//            if (this.dataTempProduct[i].productName == this.producto.productName) {
//              this.noDuplicate = false;
//              this.Cancelar();
//            }
//          }
//        }
//        if (this.noDuplicate) { 
//        this.distribucionService.postActualizaCategoria(this.producto).subscribe(
//          res => {
//            if (res != 0) {
//              setTimeout(() => { this.visible = false; }, 2000); this.content = "Ya se encuentra registrado la Categoria"; this.level = "danger"; this.visible = true;
//            } else {
//              setTimeout(() => { this.visible = false; }, 2000); this.content = "Categoria actualizada correctamente."; this.level = "success"; this.visible = true;
//              this.ngOnInit();
//            }
//          },
//          err => {
//            console.log(err);
//          }
//          );
//        }
//        }
//    } catch (e) {
//      console.log(e);
//    }
//  }
//  ocultarMensaje() {
//    this.visible = false
//  }

//  Editar(id, nombre, unidadMedida, parentId) {
//    try {
//      this.estado = 'Editando';
//      this.clase = 'warning';
//      this.producto.productId = id;
//      this.producto.productName = nombre;
//      this.producto.unidadMedidad = unidadMedida;
//      this.producto.productParentId = parentId;
//    } catch (e) {
//      console.log(e);
//    }
    
//  }

//  //agregaProducto(nombre,uMedida,categoria) {
//  //  this.Cancelar();

//  //  try {
//  //    this.idProd = '';
//  //    this.distribucionService.postInsertaProducto(nombre, uMedida, categoria).then((res) => {
//  //      setTimeout(() => { this.visible = false; }, 2000);
//  //      this.content = "Producto nuevo agregado correctamente.";
//  //      this.level = "success";
//  //      this.visible = true;
//  //      this.ngOnInit();
//  //    }).catch((err) => { this.content = "Error al ingresar nuevo producto."; this.level = "danger"; this.visible = true });

//  //  } catch (e) {
//  //    console.log(e);
//  //  }
//  //}
//  //-----Eliminar


//  idCateg: number;
//  nCateg: string;
//  envioID(categoria, nombre) {
//    this.idCateg = categoria;
//    this.nCateg = nombre;
//  }

//  Eliminar(idProducto, padre: boolean) {
//    if (padre) {
//      this.distribucionService.postEliminaCategoria(idProducto).subscribe(
//        data => {
//          setTimeout(() => { this.visible = false; }, 5000);
//          this.content = "Usuario eliminado correctamente.";
//          this.level = "success";
//          this.visible = true;
//          this.ngOnInit();
//        },
//        err => {
//          console.log(err);
//        }
//      );   
//      this.ngOnInit();
//    }else{
//      this.distribucionService.postEliminaProducto(idProducto).subscribe(
//        data => {
//          console.log("EliminadoHijo" + data);
//        },
//        err => {
//          console.log(err);
//        }
//      );
      
//    }
//    this.ngOnInit();
//  }
//  //-----Eliminar

//  Cancelar() {
//    this.producto.productId = 0;
//    this.producto.productName = null;
//    this.producto.productParentId = 1;
//    this.producto.unidadMedidad = null;
//    this.estado = 'Agregar';
//    this.clase = 'primary';
//  }

//  //mostrar(id) {
//  //  for (let i = 0; i < this.dataTempProducto.length; i++) {
//  //    if (this.dataTempProducto[i].productId == id) {
//  //      if (this.dataTempProducto[i].bloq) {
//  //        this.dataTempProducto[i].bloq = false;
//  //        break
//  //      } else {
//  //        this.dataTempProducto[i].bloq = true;
//  //        break
//  //      }        
//  //    }
//  //  }
//  //}

//  txtClass: string;
//  checkInput(input) {
//    if (input != null) {
//      this.txtClass = 'active';
//    } else {
//      this.txtClass = '';
//    }
//  }

//  public dataTempProduct: any;
//  getProducts() {
//    this.distribucionService.getListaProductos().subscribe(
//      data => {
//        this.dataTempProduct = data;
//        this.dataTempProduct = this.dataTempProduct.filter(p => p.productParentId === 0);
//        this.dataTempProduct = this.dataTempProduct.filter(p => p.productName != "NONProduct");

//        console.log(this.dataTempProduct);
//      },
//      error => {
//        console.error(error);      }
     
//    );
//  }

//  openMod(state) {
//    openModal(state);
//  }

//  closeMod(state) {
//    closeModal(state);
//  }

//  //captureNombreProducto(nomProd) {
//  //  this.producto.productName = nomProd;
//  //  this.nomProd = nomProd;
//  //}

//  //captureCategoriaProducto(idProd) {
//  //  this.producto.productParentId = idProd;
//  //  this.idProd = idProd;
//  //}

//  c: number = 0;
//  //addToDetallesArray() {
//  //  this.prodDet = new Equivalencia;
//  //  this.prodDet.equivalenciaId = ++this.c;
//  //  this.prodDet.unidadBase = this.uMedida;
//  //  this.prodDet.cantidadObjetos = this.cantObj;
//  //  this.idProdDet = this.idProdDet + 1;
//  //  this.equivalenciaDetalleArray.push(this.prodDet);
//  //  this.cleanFields();   
//  //}

//  addToSubcategoriaArray() {
//    this.prodCategoria = new Producto;
//    this.prodCategoria.productId = ++this.c;
//    this.prodCategoria.productName = this.nomProd;
//    this.subcategoria.push(this.prodCategoria);
//    this.cleanFields();
//  }

//  productos_salida: Producto[] = [];
//  public enviarProducto() {
//    for (let i = 0; i < this.subcategoria.length; i++) {
//      this.productos_salida[i] = new Producto();
//      this.productos_salida[i].productParentId = this.idCateg;
//      this.productos_salida[i].productName = this.subcategoria[i].productName;
//    }
   
//    this.distribucionService.postInsertaProducto(this.productos_salida).subscribe(
//      data => {
//        console.log("Productos registro a categoria");
//        //this.confirmModal(true);
//        //this.clean();
//      },
//      err => console.log(err),
//    );
//    this.subcategoria = [];
//  }

//  //public enviarProductoEquivalencia() {
//  //  this.producto.productParentId = this.idProd;
//  //  this.producto.productName = this.nomProd;
//  //  this.producto.equivalenciaDetalleTabla = this.equivalenciaDetalleArray;
//  //  this.distribucionService.postInsertaProducto(this.producto);
//  //  this.cleanFields();
//  //}


//  cleanFields() {
//    this.nomProd = null;

//  }

//  //eliminarEquivalencia(idEquivalencia) {
//  //  try {
//  //    for (var i = 0; i < this.equivalenciaDetalleArray.length; i++) {
//  //      if (this.equivalenciaDetalleArray[i].equivalenciaId == idEquivalencia) {
//  //        this.equivalenciaDetalleArray.splice(i, 1);
//  //      }
//  //      this.equivalenciaDetalleArray[i].equivalenciaId = i + 1;

//  //    }
//  //  } catch (e) {
//  //    console.log(e);
//  //  }
//  //}

//  eliminarProducto(id) {
//    try {
//      for (var i = 0; i < this.subcategoria.length; i++) {
//        if (this.subcategoria[i].productId == id) {
//          this.subcategoria.splice(i, 1);
//        }
//      }
//    } catch (e) {
//      console.log(e);
//    }
//  }
  
//}


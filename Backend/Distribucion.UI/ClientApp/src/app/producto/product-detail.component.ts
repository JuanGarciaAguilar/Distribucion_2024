import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
//import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
//import { Subject } from 'rxjs/Subject';
//import { FormsModule } from '@angular/forms';
//import { forEach } from '@angular/router/src/utils/collection';

//import { Equivalencia } from '../Shared/equivalencia';
//import { DistribucionService } from '../Shared/distribucion.service';
//import { Producto } from '../Shared/Producto';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.template.html'
})
export class ProductDetailComponent implements OnInit {
  ngOnInit() { }
  //public productDetail: Producto[];
  //public equivalenciaproductoDetail: any;
  //@Input() public productId: number;

  //constructor(public distribucionService: DistribucionService) { }
  //idProd: number;
  //nomProd: string;
  //idProdDet: number = 1;
  //uMedida: string;
  //cantObj: number;

  //prodDet: Equivalencia;

  //ngOnInit() {
  //  this.distribucionService.getListaEquivalencia().subscribe(
  //    data => {
  //      this.equivalenciaproductoDetail = data;
  //      //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
  //      //this.loadItems();
  //    },
  //    error => {
  //      //this.sharedDataService.sessionExpired(error);
  //    }
  //  );
  //  this.getProducts(this.productId);

  //}

  //openMod(state) {
  //  openModal(state);
  //}

  //closeMod(state) {
  //  closeModal(state);
  //}

  //getProducts(productId: number) {
  //  this.distribucionService.getListaProductos().subscribe(
  //    data => {
  //      this.productDetail = data as Producto[];
  //      this.productDetail = this.productDetail.filter(p => p.productParentId === productId);
  //    },
  //    err => console.error(err),
  //    () => console.log('loading complete')
  //  );
  //}

  //totalrows: number;
  //obtenerultimoid() {
  //  for (let i = 0; i < this.equivalenciaproductotabla.length; i++) {
  //    this.totalrows = this.equivalenciaproductotabla[i].equivalenciaId;
  //  }
  //}

  //producto = new Producto();
  //idProduc: number=0;
  //pPadre: boolean;
  //envioID(productId, padre) {    
  //  this.idProduc = productId;
  //  this.pPadre = padre;
  //  this.producto.productName = null;
  //  this.producto.unidadMedidad = null;
  //}

  //Eliminar(idProducto, padre: boolean) {
  //  try {
  //    this.distribucionService.postEliminaProducto(idProducto);
  //    this.ngOnInit();
  //  } catch (e) {
  //    console.log(e);
  //  }    
  //}
  
  //idEProd: number;
  //nombEProd: string;
  //uMedidaE: string;
  //parId: number;
  //public equivalenciaproductotabla: any;

  //enviarEditarProducto(idProducto, nameProducto) {
  //  try {
  //    this.idEProd = null;
  //    this.nombEProd = null;
  //    this.equivalenciaproductotabla = [];

  //    this.equivalenciaproductotabla = this.equivalenciaproductoDetail.filter(p => p.productId === idProducto);
  //    if (this.equivalenciaproductotabla.length < 1) {
  //      this.idEProd = idProducto;
  //      this.nombEProd = nameProducto;
  //      this.equivalenciaproductotabla = [];
  //      this.openMod('modal-ed-productos');
  //    }else {        
  //      this.equivalenciaproductotabla;
  //      this.idEProd = idProducto;
  //      this.nombEProd = nameProducto;
  //      this.obtenerultimoid();
  //      this.openMod('modal-ed-productos');
  //    }     
  //  } catch (e) {
  //    console.log(e);
  //  }
  //}

  
  //productoE;
  //editarProducto(idProducto, NombreProducto) {
  //  try {
  //    this.productoE = new Producto();
  //    this.productoE.productId = idProducto;
  //    this.productoE.productName = NombreProducto;
  //    this.productoE.equivalenciaDetalleTabla = this.equivalenciaproductotabla;
  //    this.distribucionService.postActualizaProducto(this.productoE).subscribe(
  //      data => {
  //        console.log("Actualizado" + data);
  //      },
  //      err => {
  //        console.log(err);
  //      }
  //    );
  //    this.getProducts(this.productId);
  //  } catch (e) {

  //  }
  //}

  //cancelar() {
  //  this.idEProd = null;
  //  this.nombEProd = null;
  //  this.equivalenciaproductotabla = [];
  //}

  //content: string;
  //level: string;
  //visible: boolean = false;
  //noDuplicate: boolean = true;
  //addToDetallesArray() {
  //  this.noDuplicate = true;
  //  for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
  //    if (this.equivalenciaproductotabla[i].unidadBase == this.uMedida) {
  //      this.noDuplicate = false;
  //      setTimeout(() => { this.visible = false; }, 4000);
  //      this.content = "Unidad Medida Existente";
  //      this.level = "danger";
  //      this.visible = true;
  //    }
  //  }
  //  if (this.noDuplicate) {
  //      this.prodDet = new Equivalencia;
  //      this.prodDet.equivalenciaId = this.totalrows + 1;
  //      this.totalrows = this.totalrows + 1;

  //      this.prodDet.unidadBase = this.uMedida;
  //      this.prodDet.cantidadObjetos = this.cantObj;
  //      this.equivalenciaproductotabla.push(this.prodDet);
  //      this.cleanFields();

  //    }

  //}

  //cleanFields() {
  //  this.uMedida = null;
  //  this.cantObj = null;
  //}
  //eliminarProducto(idEquivalencia) {
  //  try {
  //    for (var i = 0; i < this.equivalenciaproductotabla.length; i++) {
  //      if (this.equivalenciaproductotabla[i].equivalenciaId == idEquivalencia) {
  //        this.equivalenciaproductotabla.splice(i, 1);
  //      }
  //      this.equivalenciaproductotabla[i].equivalenciaId = i + 1;
  //    }
  //  } catch (e) {
  //    console.log(e);
  //  }
  //}

}


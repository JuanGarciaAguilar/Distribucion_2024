import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductosService } from '../../../Shared/Service/Productos.service';
import { ProductoEntity } from '../../../Shared/Models/Producto';

@Component({
  selector: 'app-Productos',
  templateUrl: './Productos.component.html',
  styleUrls: ['./Productos.component.css']
})
export class ProductosComponent implements OnInit {

  private _ProductoService = inject(ProductosService);

  ModalCategoria:boolean = false;

  TitleButton: string = 'Guardar';
  Color: string = 'primary';

  ProductoId: number = 0;
  Categoria: string = '';
  ProductoDescripcion: string = '';

  loading: boolean = true;
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [
    { label: 'Categoria Productos' },
  ];;
  constructor() { }

  ngOnInit() {
    this.getProducts();
  }

  productos: any;
  Product_Header: any;
  Product_Children: any;
  getProducts() {
    this._ProductoService.GetListaProductos().subscribe(
      (data: any) => {
        this.productos = data.filter((header: any) => header.productParentId !== 0)
        console.log('ddddd', this.productos);
      },
      (error : any) => {
        console.error(error);
      }
    );
  }

  calculateCustomerTotal(name: any) {
    return name.length;
  }

  ProductoEntity?: ProductoEntity;
  Operacion_Producto() {
    if (this.TitleButton === 'Guardar'){
      this.ProductoEntity = new ProductoEntity();
      this.ProductoEntity.productId = 0;
      this.ProductoEntity.productName = this.ProductoDescripcion;
     /*  for (let index = 0; index < this.dataTempProduct.length; index++) {
        if (this.productoname == this.dataTempProduct[index].productName) {
          this.content = "Ya se encuentra registrado la Categoria";
          this.level = "danger";
          this.visible = true;
          return;
        }
      } */
    }else{
      alert('actualizar');
    }
  }

  Operacion_Categoria() {
    if (this.TitleButton === 'Guardar'){
      this.ProductoEntity = new ProductoEntity();
      this.ProductoEntity.productId = 0;
      this.ProductoEntity.productName = this.Categoria;
      this._ProductoService
      .InsertaCategoria(this.ProductoEntity)
      .subscribe((res:any) => {
      
        this.getProducts();
        this.CleaningFields();
      });
     
    }else{
      alert('actualizar');
    }
  }

  SelectedItem(Item:any){
    console.log(Item);
    this.ProductoDescripcion = Item.productName;
    this.Categoria  = Item.grupo;
    this.TitleButton = 'Actualizar';
    this.Color = 'danger';
  }


  ModalCategoria_Open(data:any){
 
   if (data === undefined){
    this.ModalCategoria = true; 
    this.TitleButton = 'Guardar';
    this.Color = 'primary'; 
   }else{
    this.ModalCategoria = true;
    this.Categoria = data.grupo;
    this.TitleButton = 'Actualizar';
    this.Color = 'danger';
    this.ProductoId = data.productId;
   }
    
   
  }

  CleaningFields(){
    this.TitleButton = 'Agregar';
    this.Color = 'Primary';
    this.ModalCategoria = false;
    this.ProductoId = 0;
    this.ProductoDescripcion = '';
    this.Categoria = '';
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';  
import { ProductosService } from '../../../Shared/Service/Productos.service';

@Component({
  selector: 'app-Productos',
  templateUrl: './Productos.component.html',
  styleUrls: ['./Productos.component.css']
})
export class ProductosComponent implements OnInit {

  private _ProductoService = inject(ProductosService);
  loading: boolean = true;
  home: MenuItem ={ icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] =  [
    { label: 'Categoria Productos' },   
];;
  constructor() { }

  ngOnInit() {
    this.getProducts();
  }


  public dataTempProduct: any;
  getProducts() {
    this._ProductoService.GetListaProductos().subscribe(
      (data:any) => {
        this.dataTempProduct = data;
        this.dataTempProduct = this.dataTempProduct.filter(
          (p:any) => p.productParentId === 0
        ); 
        console.log("productos", data);
        this.loading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

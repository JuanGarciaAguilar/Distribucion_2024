import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductosService } from '../../../Shared/Service/Productos.service';
import { ProductoEntity } from '../../../Shared/Models/Producto';

import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-Productos',
    templateUrl: './Productos.component.html',
    styleUrls: ['./Productos.component.css'],
    providers: [MessageService]
})
export class ProductosComponent implements OnInit {

    private _ProductoService = inject(ProductosService);
    private _messageService = inject(MessageService);

    ModalCategoria: boolean = false;
    ModalEquivalencia: boolean = false;

    TitleButton: string = 'Guardar';
    Color: string = 'primary';

    ProductoId: number = 0;
    Categoria: string = '';
    ProductoDescripcion: string = '';

    Categoria_Select_Item:any;

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
    Product_Selected: any;
    getProducts() {
        this._ProductoService.GetListaProductos().subscribe(
            (data: any) => {
                this.productos = data.filter((header: any) => header.productParentId !== 0)
                this.Product_Selected = data.filter((header: any) => header.productParentId === 0);
            }
        );
    }

    calculateCustomerTotal(name: any) {
        return name.length;
    }

    ProductoEntity?: ProductoEntity;
    Operacion_Producto() {
        if (this.TitleButton === 'Guardar') {
            this.ProductoEntity = new ProductoEntity();
            this.ProductoEntity.productParentId = this.Categoria_Select_Item.productId;
            this.ProductoEntity.productName = this.ProductoDescripcion;
            this._ProductoService.InsertaProducto(this.ProductoEntity).subscribe((data:any)=>{
                    this.getProducts();
                    this.CleaningFields();
                    this._messageService.add({ severity: 'success', summary: 'Notificacion', detail: 'Registro Exitoso', key: 'Notificacion', life: 5000 });
            });
            /*  for (let index = 0; index < this.dataTempProduct.length; index++) {
               if (this.productoname == this.dataTempProduct[index].productName) {
                 this.content = "Ya se encuentra registrado la Categoria";
                 this.level = "danger";
                 this.visible = true;
                 return;
               }
             } */
        } else {
            this.ProductoEntity = new ProductoEntity();
            debugger
            this.ProductoEntity.productId = this.ProductoId;
            this.ProductoEntity.productName = this.ProductoDescripcion;
            this.ProductoEntity.equivalenciaDetalleTabla = [];
            this._ProductoService.ActualizaProducto(this.ProductoEntity).subscribe((data:any)=>{
                    this.getProducts();
                    this.CleaningFields();
                    this._messageService.add({ severity: 'success', summary: 'Notificacion', detail: 'Registro Exitoso', key: 'Notificacion', life: 5000 });
            });
        }
    }

    Operacion_Categoria() {
        if (this.TitleButton === 'Guardar') {
            this.ProductoEntity = new ProductoEntity();
            this.ProductoEntity.productId = 0;
            this.ProductoEntity.productName = this.Categoria;
            this._ProductoService
                .InsertaCategoria(this.ProductoEntity)
                .subscribe((res: any) => {
                    this.getProducts();
                    this.CleaningFields();
                    this._messageService.add({ severity: 'success', summary: 'Notificacion', detail: 'Registro Exitoso', key: 'Notificacion', life: 5000 });
                });

        } else {
            this.ProductoEntity = new ProductoEntity();
            this.ProductoEntity.productId = this.ProductoId;
            this.ProductoEntity.productName = this.Categoria;
            this._ProductoService
                .ActualizaCategoria(this.ProductoEntity)
                .subscribe((res: any) => {
                    this.getProducts();
                    this.CleaningFields();
                    this._messageService.add({ severity: 'success', summary: 'Notificacion', detail: 'Actualización Exitosa', key: 'Notificacion', life: 5000 });
                });
        }
    }

    SelectedItem(Item: any) {
        console.log(Item);
        this.ProductoId = Item.productId;
        this.ProductoDescripcion = Item.productName;
        this.Categoria = Item.grupo;
        this.TitleButton = 'Actualizar';
        this.Color = 'danger';


        this.Categoria_Select_Item = this.Product_Selected.find((f:any) => f.productId === Item.productParentId);//grupo -- productId
        console.log('cate',this.Categoria_Select_Item[0]);
    }


    ModalCategoria_Open(data: any) {


        if (data === undefined) {
            this.ModalCategoria = true;
            this.TitleButton = 'Guardar';
            this.Color = 'primary';
        } else {
            this.ModalCategoria = true;
            this.Categoria = data.grupo;
            this.TitleButton = 'Actualizar';
            this.Color = 'danger';
            this.ProductoId = data.productParentId;
        }
    }

    ModalEquivalencia_Open(data:any){
        this.ModalEquivalencia = true;
        this.ProductoDescripcion = data.productName;
    }

    CleaningFields() {
        this.TitleButton = 'Agregar';
        this.Color = 'primary';
        this.ModalCategoria = false;
        this.ProductoId = 0;
        this.ProductoDescripcion = '';
        this.Categoria = '';
        this.Categoria_Select_Item = [];
    }

}

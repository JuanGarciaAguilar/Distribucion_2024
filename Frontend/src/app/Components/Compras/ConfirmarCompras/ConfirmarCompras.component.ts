import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { ProveedorService } from 'src/app/Shared/Service/Proveedor.service';

@Component({
    selector: 'app-ConfirmarCompras',
    templateUrl: './ConfirmarCompras.component.html',
    styleUrls: ['./ConfirmarCompras.component.css'],
})
export class ConfirmarComprasComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Confirmar Compras Pendientes' },
    ];

    private _ComprasService = inject(ComprasService);
    private _ProductosService = inject(ProductosService);
    private _ProveedorService = inject(ProveedorService);
    private _Router = inject(Router);
    private _AuthService = inject(AuthService);
    constructor() {}
    ComprasData:any[]=[];
    ComprasDetalleSelected:any;
    ComprasTemp:any[] = [];
   // ProductosData:any;

   FechaCompra:string = '';
   FechaEntrega:string='';
    Ciudad:string='';
    TotalCompra:number = 0;
    TotalFlete : number=0;
    EditarCompraModal: boolean =false;
  async  ngOnInit() {
        let ProductosData:any = await this._ProductosService.GetListaProductos().toPromise();
        let ProveedorData:any = await this._ProveedorService.getProveedoresAll().toPromise();
        this.ComprasTemp.push(this._AuthService.GetCompraData());
    console.log(this.ComprasTemp);


        this.FechaCompra = this.ComprasTemp[0].fechaCompra;
        this.FechaEntrega = this.ComprasTemp[0].fechaCompra;
        this.Ciudad = this.ComprasTemp[0].origenCompra;
        this.TotalCompra = this.ComprasTemp[0].totalCompra;
        this.TotalFlete = this.ComprasTemp[0].costoFlete;
        for(let row of this.ComprasTemp[0].compraDetalleTabla){
            debugger
           let Producto = ProductosData.filter((f:any)=> f.productId == row.productId && f.productParentId !== 0);
           let Proveedor = ProveedorData.filter((f:any)=> f.proveedorId == row.proveedorId );
            row.ProductName=Producto[0].productName;
            row.ProveedorName=Proveedor[0].proveedorName;
            this.ComprasData.push(row);
        }
        console.log(this.ComprasData);

    }



}

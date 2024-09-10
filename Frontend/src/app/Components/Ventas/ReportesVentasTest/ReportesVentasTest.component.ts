import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ReportesCompras } from 'src/app/Shared/Models/Reportes';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { ProveedorService } from 'src/app/Shared/Service/Proveedor.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-ReportesVentasTest',
  templateUrl: './ReportesVentasTest.component.html',
  styleUrls: ['./ReportesVentasTest.component.css']
})
export class ReportesVentasTestComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte de Compras' },
    ];
    private _VentasService = inject(VentasService);
    private _ProductosService = inject(ProductosService);
  constructor() { }
  fInicio: string = '';
  fFin: string = '';
   ngOnInit() {
    console.log(' juan garcia   ');

    this.GetProductos();
  }

  ProductosHeader:any;
  GetProductos() {
    this._ProductosService.GetListaProductos().subscribe((data: any) => {
            this.ProductosHeader = data.filter((header: any) => header.productParentId == 0);
        }
    );
}


reporteequema!:ReportesCompras;
Hijos:any[]=[];
Data:any;
dataaa:any[]=[];
hijodeijos:any[]=[];
  ReporteData:any;
  async getReporte(){


    this._VentasService.getReporteVentas(this.fInicio, this.fFin, 0).subscribe(
      (data:any) => {
     //   console.log('GetProductos',data);
        for(let producto of this.ProductosHeader){

                let array = data.filter((f:any)=> f.productParentName.trim() == producto.productName.trim())
                for(let ar of array){


                    let datito = {
                        name : ar.productName.trim(),
                        Concepto: [
                            {Descripcion :'Stock Inicial'},
                            {Descripcion :'Stock Final'},
                            {Descripcion :'Stock'}
                        ]
                    }
                    if (this.dataaa.length == 0){
                        this.dataaa.push(datito);
                    }
                    else{
                        let filter = this.dataaa.filter((f:any)=> f.name == ar.productName.trim());

                        if (filter.length == 0){
                            this.dataaa.push(datito);
                        }
                    }




                }

                producto.ProductosData = this.dataaa ;
                this.dataaa=[];


    }

      for(let header of this.ProductosHeader){
            for(let hijo of header.ProductosData){

                let Dates = data.filter((f:any)=> f.productParentName.trim() == header.productName.trim() && f.productName.trim() == hijo.name.trim());

                hijo.children = Dates;

                for(let registros of hijo.children)
                {
                    let items = Dates.filter((f:any)=> f.clienteName == 'Stock Inicial');
                    registros.StockInicial = items;
                }

                for(let registros of hijo.children)
                    {
                        let items = Dates.filter((f:any)=> f.clienteName == 'Stock Final');
                        registros.StockFinal = items;
                    }

                    for(let registros of hijo.children)
                        {
                            let items = Dates.filter((f:any)=> f.clienteName !== 'Stock Final' && f.clienteName == 'Stock Inicial');
                            registros.Stock = items;
                        }
            }
        }

        console.log(this.ProductosHeader);

      });
    }
}

function has(itemCode: any): unknown {
    throw new Error('Function not implemented.');
}
//this.reporteequema = Array.from(new Set(this.reporteequema))


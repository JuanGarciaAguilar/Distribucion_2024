import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ReportesCompras } from 'src/app/Shared/Models/Reportes';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-ReporteVentas',
  templateUrl: './ReporteVentas.component.html',
  styleUrls: ['./ReporteVentas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  items: MenuItem[] = [
    { icon: 'pi pi-home', route: '/' },
    { label: 'Reporte de Ventas' },
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
        this.ProductosHeader = data;//.filter((header: any) => header.productParentId == 0);
        console.log('GetProductos',data);
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
    debugger
    for(let producto of this.ProductosHeader){

            let array = data.filter((f:any)=> f.productParentName.trim() == producto.productName.trim())
            for(let ar of array){
                let datito = {
                    name : ar.productName.trim(),
                    Concepto: [
                        {Descripcion :'Stock Inicial'},
                        {Descripcion :'Stock Final'},
                        {Descripcion :'Venta'}
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
          let StockInicial = Dates.filter((f:any)=> f.descripcion == 'Stock Inicial' || f.descripcion == 'Compra');
          let StockFinal = Dates.filter((f:any)=> f.descripcion == 'Stock Final');
          let items = Dates.filter((f:any)=> f.descripcion == 'Venta');
            for(let con of hijo.Concepto){
                if (con.Descripcion == 'Stock Inicial'){
                    let dat = StockInicial.filter((f:any)=>  f.cantidadCompra !== 0);
debugger
                    if (dat.length == 0){
                        con.Items = [{adelanto : '',
                            amortizacion : 0,
                            cantidadCompra : 0,
                            cantidadCompraEstandar : 0,
                            cantidadVenta : 0,
                            cantidadVentaEstandar : 0,
                            clienteId : 0,
                            clienteName : "Stock Inicial",
                            descripcion : "Stock Inicial",
                            fecha : "",
                            fechaReserva : null,
                            observacion : "------------",
                            precioIngresadoVenta : 0,
                            productId : 0,
                            productName : hijo.name.trim(),
                            productParentId : 0,
                            productParentName : " ",
                            relevanceValue : 0,
                            sectorId : 0,
                            sectorName : "Stock Inicial",
                            stock : 0,
                            stockInicial : 0,
                            stockSobrante : 0,
                            unidadMedida : "",
                            usuarioId : "--------",
                            ventaId : 0}]
                    }else{
                        con.Items = StockInicial.filter((f:any)=>  f.cantidadCompra !== 0);
                    }

                }
                if (con.Descripcion == 'Compra'){
                    con.Items = StockInicial;
                }
                if (con.Descripcion == 'Venta'){
                    con.Items = items;
                }
                if (con.Descripcion == 'Stock Final'){
                    con.Items = StockFinal;
                }
            }
        }
    }

  });
}

TotalInicial(data:any){
let total : number = 0;
   for(let row of data.Concepto){
        for(let item of row.Items){
            if (item.descripcion == 'Stock Inicial' || item.descripcion == 'Compra'){
                total += item.cantidadCompra;
            }
        }
   }
    return total;
}

TotalFinal(data:any){
    let total : number = 0;
       for(let row of data.Concepto){
            for(let item of row.Items){
                if (item.descripcion == 'Stock Final'){
                    total += item.stockSobrante;
                }
            }
       }
        return total;
}

TotalVentas(data:any){
    let total : number = 0;
       for(let row of data.Concepto){
            for(let item of row.Items){
                if (item.descripcion == 'Venta'){
                    total += item.cantidadVenta;
                }
            }
       }
        return total;
}

}


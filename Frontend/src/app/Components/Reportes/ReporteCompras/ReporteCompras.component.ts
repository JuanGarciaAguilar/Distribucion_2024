import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProveedorService } from 'src/app/Shared/Service/Proveedor.service';

@Component({
  selector: 'app-ReporteCompras',
  templateUrl: './ReporteCompras.component.html',
  styleUrls: ['./ReporteCompras.component.css']
})
export class ReporteComprasComponent implements OnInit {
  items: MenuItem[] = [
    { icon: 'pi pi-home', route: '/' },
    { label: 'Reporte de Compras' },
];
private _ComprasService = inject(ComprasService);
private _ProveedorService = inject(ProveedorService);
constructor() { }
ProveedorData:any;
ProveedorSelected:any;
fInicio: string = '';
fFin: string = '';
nProveedor: string = '';
totalflete: number = 0;
calculoTotalCompras: number = 0;
ngOnInit() {
this.GetProvedor();
}

GetProvedor(){
this._ProveedorService.getProveedoresAll().subscribe(
    (data:any) => {
      this.ProveedorData = data;
      this.ProveedorData.unshift({"proveedorId": "","proveedorName":"Todos los Proveedores"})
      //this.loading = false;
    });
}

ReporteData:any;
getReporte() {
/*  this.totalcantidad = 0;
this.totalflete = 0;
this.loading = true; */
debugger
this._ComprasService
  .getReporteCompras(this.fInicio, this.fFin, this.ProveedorSelected.proveedorName)
  .subscribe((data:any) => {
    this.ReporteData = data;
    console.log('dataaaaa',data);

  /*   this.loadItems();
    this.loading = false;

    this.calculoTotalCompras = 0;
    this.totalflete = 0;

    for (let i = 0; i < this.reporteComprasTemp.length; i++) {
      debugger;
      this.calculoTotalCompras += this.reporteComprasTemp[i].precioCompra;

      this.totalflete +=
        this.reporteComprasTemp[i].costoFleteItemCompra *
        this.reporteComprasTemp[i].cantidadCompra; */
   /*  } */
  });
}
}

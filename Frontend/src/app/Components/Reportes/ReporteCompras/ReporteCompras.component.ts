import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CiudadService } from 'src/app/Shared/Service/Ciudad.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProveedorService } from 'src/app/Shared/Service/Proveedor.service';

@Component({
    selector: 'app-ReporteCompras',
    templateUrl: './ReporteCompras.component.html',
    styleUrls: ['./ReporteCompras.component.css'],
})
export class ReporteComprasComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte de Compras' },
    ];
    private _ComprasService = inject(ComprasService);
    private _ProveedorService = inject(ProveedorService);
    private _CiudadService = inject(CiudadService);
    constructor() {}
    ProveedorData: any;
    ProveedorSelected: any;
    fInicio: string = '';
    fFin: string = '';
    nProveedor: string = '';
    totalflete: number = 0;
    calculoTotalCompras: number = 0;
    CiudadData: any;

    async ngOnInit() {
        this.GetProvedor();
        this.CiudadData = await this._CiudadService
            .getAllNewCiudad()
            .toPromise();
    }

    GetProvedor() {
        this._ProveedorService.getProveedoresAll().subscribe((data: any) => {
            this.ProveedorData = data;
            this.ProveedorData.unshift({
                proveedorId: '0',
                proveedorName: 'Todos los Proveedores',
            });
        });
    }

    ReporteData: any;
    getReporte() {

        this._ComprasService
            .getReporteCompras(
                this.fInicio,
                this.fFin,
                this.ProveedorSelected.proveedorId
            )
            .subscribe((data: any) => {
                this.ReporteData = data;
                console.log('dataaaaa', data);
                for (let row of this.ReporteData) {
                    let CiudadName = this.CiudadData.filter(
                        (f: any) => f.ciudadId == row.origenCompra
                    );
                    console.log(CiudadName);
                    row.origenCompra = CiudadName[0].ciudadName;
                }
            });
    }


    TotalItem(name: string) {
        let total = 0;

        if (this.ReporteData) {
            for (let customer of this.ReporteData) {
                if (customer.proveedorName === name) {
                    total++;
                }
            }
        }

        return total;
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CierreDiarioReportHeader } from 'src/app/Shared/Models/ReportesModel';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ReportesService } from 'src/app/Shared/Service/Reportes.service';
import { SectorService } from 'src/app/Shared/Service/Sector.service';

@Component({
    selector: 'app-ReporteDiario',
    templateUrl: './ReporteDiario.component.html',
    styleUrls: ['./ReporteDiario.component.css'],
})
export class ReporteDiarioComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Reporte diario' },
    ];
 /*    private _ClienteService = inject(ClienteService);
    private _SectorService = inject(SectorService);
    private _ReportesService = inject(ReportesService); */
    constructor() {}
    sales: any;
    SectorData: any;
    ngOnInit() {
        /* this.GetSectores();
        this.GetClientes();
        this.getReporteCierre DiarioCabecera();*/
    }

   /*  GetClientes() {
        this._ClienteService.getListaClientes().subscribe((clientesData) => {
            console.log(clientesData);
        });
    }

    GetSectores() {
        this._SectorService.getListaSector().subscribe((data: any) => {
            this.SectorData = data;
        });
    }

    columns: CierreDiarioReportHeader[] = [];
    getReporteCierreDiarioCabecera() {
        this._ReportesService
            .getReporteCierreDiarioCabecera()
            .subscribe((data: any) => {
                this.columns = data;
                console.log(data);
            });
    } */
}

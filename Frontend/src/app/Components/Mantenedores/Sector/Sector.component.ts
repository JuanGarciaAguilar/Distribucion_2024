import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { SectorModel } from 'src/app/Shared/Models/SectorModel';
import { SectorService } from 'src/app/Shared/Service/Sector.service';

@Component({
    selector: 'app-Sector',
    templateUrl: './Sector.component.html',
    styleUrls: ['./Sector.component.css'],
    providers: [MessageService],
})
export class SectorComponent implements OnInit {
    private _MessageService = inject(MessageService);
    private _SectorService = inject(SectorService);

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de proveedores' },
    ];
    constructor() {}
    SectorData: any;
    SectorId?: number;
    SectorName?: string;

    update = false;
    insert = true;
    ngOnInit() {
        this.loadsector();
    }

    loadsector() {
        this._SectorService.getListaSector().subscribe((data: any) => {
            console.log(data);

            this.SectorData = data;
        });
    }

    seleccionsector(data: any) {
        this.SectorName = data.sectorName;
        this.SectorId = data.sectorId;

        this.update = true;
        this.insert = false;
    }

    Insertsector() {
        if (this.SectorId == null || this.SectorId == 0) {
            const data = new SectorModel();
            data.sectorName = this.SectorName;
            this._SectorService.Insertarsector(data).subscribe((x: any) => {
                this.loadsector();
                this._MessageService.add({
                    severity: 'info',
                    summary: 'Registro Exitoso',
                    detail: 'Sector registrado correctamente',
                    key: 'Notificacion',
                    life: 5000,
                });
                this.clearFeils();
            });
        }
        else{
            this._MessageService.add({
                severity: 'error',
                summary: 'Algo Salio Mal',
                detail: 'Actualize la pagina',
                key: 'Notificacion',
                life: 5000,
            });
            this.clearFeils();
        }
    }

    Actualizarsector() {
        const data = new SectorModel();
        data.sectorId = this.SectorId;
        data.sectorName = this.SectorName;
        this._SectorService.Updatesector(data).subscribe((x: any) => {
            this.loadsector();
            this._MessageService.add({
                severity: 'info',
                summary: 'Actualizacion Exitoso',
                detail: 'Sector Actualizado correctamente',
                key: 'Notificacion',
                life: 5000,
            });
            this.update = false;
            this.clearFeils();
        });
    }

    clearFeils(){
        this.SectorId = 0;
        this.SectorName = '';
        this.insert =true;

    }
}

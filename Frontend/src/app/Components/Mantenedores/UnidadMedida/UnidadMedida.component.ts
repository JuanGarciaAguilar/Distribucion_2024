import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { UnidadMedidaModel } from 'src/app/Shared/Models/UnidadMedidaModel';
import { UnidadMedidaService } from 'src/app/Shared/Service/UnidadMedida.service';

@Component({
    selector: 'app-UnidadMedida',
    templateUrl: './UnidadMedida.component.html',
    styleUrls: ['./UnidadMedida.component.css'],
    providers: [MessageService],
})
export class UnidadMedidaComponent implements OnInit {
    private _MessageService = inject(MessageService);
    private _UnidadMedidaService = inject(UnidadMedidaService);
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de Unidad de Medida' },
    ];
    constructor() {}
    UnidadMedidaData: any;
    unidadMedidaID: number = 0;
    unidadMedidad?: string;
    unidadDestino?: string;
    DisabledUpdate:boolean =false;
    ngOnInit() {
        this.loadUnidadMedida();
    }

    loadUnidadMedida() {
        this._UnidadMedidaService.getUnidadMedida().subscribe((data: any) => {
            this.UnidadMedidaData = data;
        });
    }
    SelectionItem(data: any) {
        this.unidadMedidad = data.unidadMedidad.trim();
        this.unidadDestino = data.unidadDestino.trim();
        this.unidadMedidaID = data.unidadMedidaID;
        this.DisabledUpdate = true;
    }
    Insertsector() {
        if (this.unidadMedidaID == 0) {
            const data = new UnidadMedidaModel();
            data.unidadMedidad = this.unidadMedidad?.trim();
            data.unidadDestino = this.unidadDestino?.trim();

            for (var i = 0; i < this.UnidadMedidaData.length; i++) {
                if (
                    this.UnidadMedidaData[i].unidadMedidad.trim() ==
                    data.unidadMedidad?.trim()
                ) {
                    this._MessageService.add({
                        severity: 'error',
                        summary: 'Unidad de Medida ya existe',
                        detail: 'Ingrese existe la unidad de medida ingresada',
                        key: 'Notificacion',
                        life: 5000,
                    });
                    return;
                }
            }

            this._UnidadMedidaService
                .InsertarUnidadMedida(data)
                .subscribe((x: any) => {
                    this.loadUnidadMedida();
                    this.ClearFilds();
                    this._MessageService.add({
                        severity: 'info',
                        summary: 'Registro Exitoso',
                        detail: 'Unidad de Medida registrada correctamente',
                        key: 'Notificacion',
                        life: 5000,
                    });
                });
        }
    }

    Actualizarsector() {

        if(this.unidadMedidaID == 0){
            this._MessageService.add({
                severity: 'error',
                summary: 'Error al Actualizar Unidad Medida',
                detail: 'Seleccione Registro a Actualizar',
                key: 'Notificacion',
                life: 5000,
            });
            return;
        }
        const data = new UnidadMedidaModel();
        data.unidadMedidaID = this.unidadMedidaID;
        data.unidadMedidad = this.unidadMedidad?.trim();
        data.unidadDestino = this.unidadDestino?.trim();

        for (var i = 0; i < this.UnidadMedidaData.length; i++) {
            if (
                this.UnidadMedidaData[i].unidadMedidad.trim() ==
                data.unidadMedidad?.trim()
            ) {
                this._MessageService.add({
                    severity: 'error',
                    summary: 'Unidad de Medida ya existe',
                    detail: 'Ingrese existe la unidad de medida ingresada',
                    key: 'Notificacion',
                    life: 5000,
                });
                return;
            }
        }

        this._UnidadMedidaService
            .UpdateUnidadMedida(data)
            .subscribe((x: any) => {
                this.loadUnidadMedida();
                this.ClearFilds();
                this._MessageService.add({
                    severity: 'info',
                    summary: 'Registro Exitoso',
                    detail: 'Unidad de Medida actualizada correctamente',
                    key: 'Notificacion',
                    life: 5000,
                });
            });
    }

    ClearFilds() {
        this.unidadMedidaID = 0;
        this.unidadDestino = '';
        this.unidadMedidad = '';
        this.DisabledUpdate = false;
    }
}

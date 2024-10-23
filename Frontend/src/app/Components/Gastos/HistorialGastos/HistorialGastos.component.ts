import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { GastoDetalle, GastosModel } from 'src/app/Shared/Models/GastosModel';
import { GastosService } from 'src/app/Shared/Service/Gastos.service';
import { UsuarioService } from 'src/app/Shared/Service/usuario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-HistorialGastos',
    templateUrl: './HistorialGastos.component.html',
    styleUrls: ['./HistorialGastos.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class HistorialGastosComponent implements OnInit {
    @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo Historial de Gastos' },
    ];
    private _GastosService = inject(GastosService);
    private _UsuarioService = inject(UsuarioService);
    private _MessageService = inject(MessageService);
    private _ConfirmationService = inject(ConfirmationService);

    HistorialGastos: any;
    UpdateGastoModal: boolean = false;
    gastoDetalleArray: any;

    fInicioModal: Date = new Date();
    fFinModal: Date = new Date();
    newInsumo: string = '';
    newMonto: number = 0;
    newcomme: string = '';
    tPersonal: string = '';
    NroFila: number = 0;
    tempusu: any;
    E_Personal: boolean = true;

    _FormGroup: FormGroup;
    constructor() {
        this._FormGroup = new FormGroup({
            fInicioModal: new FormControl(null, [Validators.required]),
            fFinModal: new FormControl(null, [Validators.required]),
            newInsumo: new FormControl(null, [Validators.required]),
            newMonto: new FormControl(null, [Validators.required]),
            tPersonal: new FormControl(null),
            newcomme: new FormControl(null, [Validators.required]),
        });
    }

    ngOnInit() {
        this.GetHistorial();

        this._UsuarioService.getListaUsuario().subscribe((da: any) => {
            this.tempusu = da;

            for (let i = 0; i < this.tempusu.length; i++) {
                this.E_Personal = this.tempusu[i].userID;
            }
        });
    }

    GetHistorial() {
        this._GastosService.getGastosAll().subscribe((data: any) => {
            this.HistorialGastos = data;
        });
    }

    OpenUpdateGastosModal(Data: any) {

        this.UpdateGastoModal = true;
        this.gastoDetalleArray = Data.gastoSemanalTabla;
        this.fInicioModal = Data.fechaInicio;
        this.fFinModal = Data.fechaFinal;
        this.GastoTotal = Data.gastoTotal;
        this.gastoSemanalId = Data.gastoSemanalId;
    }

    gastoSemanalDetalleId: number = 0;
    gastoSemanalId: number = 0;
    B_Operation: Boolean = true;
    B_Insert: Boolean = false;
    B_Update: Boolean = true;
    GastoTotal: number = 0;
    SelectionItemDetalle(data: any) {

        this.gastoSemanalDetalleId = data.gastoSemanalDetalleId;
        this.newInsumo = data.insumo;
        this.tPersonal = data.userId;
        this.newMonto = data.gasto;
        this.newcomme = data.comentario;

        this.B_Operation = false;
        if (data.userId == '' || data.userId == undefined) {
            this.E_Personal = true;
        } else {
            this.E_Personal = false;
        }

        this.B_Insert = true;
        this.B_Update = false;
    }

    CheckPersonal() {
        if (this.newInsumo == 'Personal') {
            this.E_Personal = false;
        } else {
            this.E_Personal = true;
        }
    }
    gastoTemporal: GastosModel = new GastosModel();
    field(name: string) {
        return this._FormGroup?.get(name);
    }
    updateData() {
        debugger
        this.gastoTemporal.fechaInicio =  this.field("fInicioModal")?.value == null ? this.fInicioModal : this.field("fInicioModal")?.value;;
        this.gastoTemporal.fechaFinal =  this.field("fFinModal")?.value == null ? this.fFinModal : this.field("fFinModal")?.value;
        this.gastoTemporal.gastoSemanalId = this.gastoSemanalId;
        this.gastoTemporal.gastoTotal = 0;
        for (let row of this.gastoDetalleArray) {
            this.gastoTemporal.gastoTotal += row.gasto;
        }

        this.gastoTemporal.gastoSemanalTabla = this.gastoDetalleArray;
        this._GastosService
            .updateGasto(this.gastoTemporal)
            .subscribe((data: any) => {
                this._MessageService.add({
                    severity: 'info',
                    summary: 'Registro Exitoso',
                    detail: 'Se añadio el registro a la lista de gastos',
                    key: 'Notificacion',
                    life: 5000,
                });

                this.GetHistorial();
                this.clearFields();
                this.UpdateGastoModal = false;
            });
    }
    gastoDetalleTemporal?: GastoDetalle;
    addDetalleToArrayTemp() {
        if (this.newInsumo == '' || this.newInsumo == undefined) {
            this._MessageService.add({
                severity: 'error',
                summary: 'Campos Vacios',
                detail: 'Seleccione Tipo de Gasto',
                key: 'Notificacion',
                life: 5000,
            });
            return;
        }

        if (this.newMonto == 0 || this.newMonto == undefined) {
            this._MessageService.add({
                severity: 'error',
                summary: 'Campos Vacios',
                detail: 'Ingrese el Monto',
                key: 'Notificacion',
                life: 5000,
            });
            return;
        }

        this.GastoTotal = this.GastoTotal + this.newMonto;
        this.gastoDetalleTemporal = new GastoDetalle();
        this.gastoDetalleTemporal.gastoSemanalDetalleId = 0;
        this.gastoDetalleTemporal.insumo = this.newInsumo;
        this.gastoDetalleTemporal.gasto = this.newMonto;
        this.gastoDetalleTemporal.comentario = this.newcomme;
        this.gastoDetalleTemporal.userId = this.tPersonal;
        this.gastoDetalleArray.push(this.gastoDetalleTemporal);
        this.gastoTemporal.gastoTotal = this.GastoTotal;
        this._MessageService.add({
            severity: 'info',
            summary: 'Registro Exitoso',
            detail: 'Se añadio el registro a la lista de gastos',
            key: 'Notificacion',
            life: 5000,
        });

        this.clearFields();
    }

    UpdateGastosArray() {

        for (let row of this.gastoDetalleArray) {
            if (row.gastoSemanalDetalleId == this.gastoSemanalDetalleId) {
                row.insumo = this.newInsumo;
                row.gasto = this.newMonto;
                row.comentario = this.newcomme;
                row.userId = this.tPersonal;
            }
        }
        this.GastoTotal = 0;
        for (let row of this.gastoDetalleArray) {
            this.GastoTotal += row.gasto;
        }

        this.clearFields();
    }

    DeleteItem(data: any) {
        this.gastoDetalleArray.forEach((element: any, index: any) => {
            if (element.gastoSemanalDetalleId == data.gastoSemanalDetalleId) {
                this.gastoDetalleArray.splice(index, 1);
            }
        });
        this.GastoTotal = 0;
        for (let row of this.gastoDetalleArray) {
            this.GastoTotal += row.gasto;
        }
        this.clearFields();
    }
    GastoSelected: any;
    DeleteConfirm(event: Event, data: any) {
        this.GastoSelected = data;
        this._ConfirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Desea Elimiar el gasto seleccionada?',
        });
    }

    deleteGastoById() {
        this._GastosService
            .deleteGastoById(this.GastoSelected.gastoSemanalId)
            .subscribe((data: any) => {
                this.GetHistorial();
                this._MessageService.add({
                    severity: 'info',
                    summary: 'Eliminacion Exitosa',
                    detail: 'Se Elimino el registro seleccionado',
                    key: 'Notificacion',
                    life: 5000,
                });
                this.confirmPopup.reject();
            });
    }

    NotConfirm() {
        this.GastoSelected = [];
        this.confirmPopup.reject();
        this.clearFields();
    }
    clearFields() {
        this.newInsumo = '';
        this.newMonto = 0;
        this.newcomme = '';
        this.tPersonal = '';
        this.E_Personal = true;
        this.B_Operation = true;
        this.B_Insert = false;
        this.B_Update = true;
    }
}

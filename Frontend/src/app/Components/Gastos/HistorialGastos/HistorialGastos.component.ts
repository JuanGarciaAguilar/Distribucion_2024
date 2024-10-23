import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { GastoDetalle, GastosModel } from 'src/app/Shared/Models/GastosModel';
import { GastosService } from 'src/app/Shared/Service/Gastos.service';
import { UsuarioService } from 'src/app/Shared/Service/usuario.service';

@Component({
    selector: 'app-HistorialGastos',
    templateUrl: './HistorialGastos.component.html',
    styleUrls: ['./HistorialGastos.component.css'],
    providers: [MessageService],
})
export class HistorialGastosComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo Historial de Gastos' },
    ];
    private _GastosService = inject(GastosService);
    private _UsuarioService = inject(UsuarioService);
    private _MessageService = inject(MessageService);

    HistorialGastos: any;
    UpdateGastoModal: boolean = false;
    gastoDetalleArray: any;

    fInicioModal: Date = new Date();
    fFinModal: Date = new Date();
    newInsumo: string = "";
    newMonto: number = 0;
    newcomme: string = '';
    tPersonal: string = '';
    tempusu: any;
    E_Personal: boolean = true;
    constructor() { }

    ngOnInit() {
       this.GetHistorial();

        this._UsuarioService.getListaUsuario().subscribe((da: any) => {
            this.tempusu = da;

            for (let i = 0; i < this.tempusu.length; i++) {
                this.E_Personal = this.tempusu[i].userID;
            }
        });
    }

    GetHistorial(){
        this._GastosService.getGastosAll().subscribe((data: any) => {
            this.HistorialGastos = data;

        });
    }

    OpenUpdateGastosModal(Data: any) {
        console.log(Data);
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
    GastoTotal : number =0;
    SelectionItemDetalle(data: any) {
        console.log('itemmmmm', data);
       
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
    }

    CheckPersonal() {
        
        if (this.newInsumo == 'Personal') {
            this.E_Personal = false;
        } else {
            this.E_Personal = true;
        }
    }
    gastoTemporal: GastosModel = new GastosModel();

    updateData() {
        
        
        this.gastoTemporal.fechaInicio = this.fInicioModal;
        this.gastoTemporal.fechaFinal = this.fFinModal;
        this.gastoTemporal.gastoSemanalId = this.gastoSemanalId;
        this.gastoTemporal.gastoTotal = 0;
       for(let row of this.gastoDetalleArray){
            this.gastoTemporal.gastoTotal += row.gasto;
        } 
        
        this.gastoTemporal.gastoSemanalTabla = this.gastoDetalleArray;
        this._GastosService.updateGasto(this.gastoTemporal).subscribe(
            (data: any) => {
                this._MessageService.add({
                    severity: 'info'
                    , summary: 'Registro Exitoso'
                    , detail: 'Se añadio el registro a la lista de gastos'
                    , key: 'Notificacion'
                    , life: 5000
                });
               
                this.GetHistorial();
                this.clearFields();
                this.UpdateGastoModal = false;
            }
        );


    }
    gastoDetalleTemporal?: GastoDetalle;
    addDetalleToArrayTemp() { 

        if (this.newInsumo == '' || this.newInsumo == undefined){
            this._MessageService.add({
                severity: 'error'
                , summary: 'Campos Vacios'
                , detail: 'Seleccione Tipo de Gasto'
                , key: 'Notificacion'
                , life: 5000
            });
            return
        }

        if (this.newMonto == 0 || this.newMonto == undefined){
            this._MessageService.add({
                severity: 'error'
                , summary: 'Campos Vacios'
                , detail: 'Ingrese el Monto'
                , key: 'Notificacion'
                , life: 5000
            });
            return
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
            severity: 'info'
            , summary: 'Registro Exitoso'
            , detail: 'Se añadio el registro a la lista de gastos'
            , key: 'Notificacion'
            , life: 5000
        });
        this.clearFields(); 
        
    }

    clearFields(){
        this.newInsumo = '';
        this.newMonto = 0;
        this.newcomme = '';
        this.tPersonal = '';
        this.E_Personal = true;
        this.B_Operation = true;
        this.UpdateGastoModal = false 
        
    }
}

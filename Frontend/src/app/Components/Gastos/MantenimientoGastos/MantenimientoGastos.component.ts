import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { GastoDetalle, GastosModel } from 'src/app/Shared/Models/GastosModel';
import { UsuariosModel } from 'src/app/Shared/Models/UsuariosModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { GastosService } from 'src/app/Shared/Service/Gastos.service';
import { UsuarioService } from 'src/app/Shared/Service/usuario.service';

@Component({
    selector: 'app-MantenimientoGastos',
    templateUrl: './MantenimientoGastos.component.html',
    styleUrls: ['./MantenimientoGastos.component.css'],
    providers: [MessageService],
})
export class MantenimientoGastosComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de Gastos' },
    ];
    private _AuthService = inject(AuthService);
    private _UsuarioService = inject(UsuarioService);
    private _GastosService = inject(GastosService);
    private _MessageService = inject(MessageService);
    constructor() {}

    idGasto: number = 1;
    GastosData: any;
    comentario?: string;
    fInicio!: Date;
    fFin!: Date;
    mMonto: number = 0;
    insumo?: string;
    tGasto?: string;
    tPersonal?: string;

    gastoDet!: GastoDetalle;
    gasto!: GastosModel;
    gastoDetalleArray: any[] = [];
    checkFecha: boolean = false;
    idBorrar: number = 0;
    E_Personal: boolean = true;
    usu?: UsuariosModel;
    tempusu: any;
    //Variables para validacion
    estadoBoton1: boolean = true;
    estadoBoton2: boolean = true;
    validFechas1: boolean = true;
    validFechas2: boolean = true;
    validMonto: boolean = true;
    rangeDateExceed: boolean = false;

    public dataTempGastos: any;
    ngOnInit() {
        this._UsuarioService.getListaUsuario().subscribe((da: any) => {
            this.tempusu = da;

            /* for (let i = 0; i < this.tempusu.length; i++) {
                this.E_Personal = this.tempusu[i].userID;
            } */
        });
    }

    enableBtnRegistrar() {
        if (
            this.tGasto != null &&
            this.tGasto != '' &&
            this.mMonto > 0 &&
            this.validFechas1 == true &&
            this.validFechas2 == true &&
            this.rangeDateExceed == false
        ) {
            this.estadoBoton1 = false;
        } else {
            this.estadoBoton1 = true;
        }
    }

    public getInsumo() {
        this.insumo = this.tGasto;
        if (this.tGasto == 'Personal') {
            this.E_Personal = false;
        } else {
            this.E_Personal = true;
            this.tPersonal = '';
        }
    }
    checkBotonEnviar() {
        if (this.gastoDetalleArray.length > 0) {
            this.estadoBoton2 = false;
        } else {
            this.estadoBoton2 = true;
        }
    }
    TotalGastos: number = 0;
    sumarGastoTotal() {
        this.TotalGastos = 0;
        debugger;
        for (var i = 0; i < this.gastoDetalleArray.length; i++) {
            this.TotalGastos += this.gastoDetalleArray[i].gasto;
        }
    }

    captureNewFechaFin(fFinal: Date) {
        this.gasto.fechaFinal = fFinal;
        this.fFin = fFinal;
    }

    captureNewFechaInicio() {
        this.gasto.fechaInicio = this.fInicio;
        this.fInicio = this.fInicio;
    }

    guardarId(id: number) {
        this.idBorrar = id;
    }

    checkVacio(val: any) {

        if (val < 0) {
            this.validMonto = false;
        } else {
            this.validMonto = true;
        }
    }

    checkDetalle() {
        if (this.tGasto != null && this.tGasto != '' && this.mMonto > 0) {
            this.estadoBoton1 = false;
        } else {
            this.estadoBoton1 = true;
        }
    }

    enableBtnGuardar() {
        if (
            this.validFechas1 == true &&
            this.validFechas2 == true &&
            this.rangeDateExceed == false
        ) {
            this.estadoBoton2 = false;
        } else {
            this.estadoBoton2 = true;
        }
    }
    idGastoDet: number = 1;
    GastosDataArray: any[] = [];
    public addGastoToArray() {

        this.gastoDet = new GastoDetalle();
        this.gastoDet.insumo = this.tGasto!;
        this.gastoDet.gasto = this.mMonto;
        this.gastoDet.comentario = this.comentario!;
        this.gastoDet.gastoSemanalId = this.idGasto;
        this.gastoDet.gastoSemanalDetalleId = this.idGastoDet;
        this.gastoDet.userId = this.tPersonal!;
        this.idGastoDet = this.idGastoDet + 1;
        console.log(this.gastoDet);

        this.gastoDetalleArray.push(this.gastoDet);
        this.sumarGastoTotal();

        if (this.estadoBoton2 == true) {
            this.checkBotonEnviar();
        }

        this.tPersonal = '';
        this.E_Personal = true;

        this.mMonto = 0;
        this.tGasto = '';

        this.comentario = '';
        this.mMonto = 0;
    }

    DeleteItem(data: any) {
        this.gastoDetalleArray.forEach((element: any, index: any) => {
            if (element.gastoSemanalDetalleId == data.gastoSemanalDetalleId) {
                this.gastoDetalleArray.splice(index, 1);
            }
        });

        this.TotalGastos = 0;
        for(let row of this.gastoDetalleArray){
            this.TotalGastos += row.gasto;
        }
    }

    InsertGastos(){

        const gasto = new GastosModel();

        if (this.fInicio > this.fFin){
            this._MessageService.add({
                severity: 'error'
                , summary: 'Error en fechas'
                , detail: 'Fecha  de inicio no puede ser mayor a fecha final'
                , key: 'Notificacion'
                , life: 5000
              });
              return
        }

        if (this.gastoDetalleArray.length == 0){
            this._MessageService.add({
                severity: 'error'
                , summary: 'Error'
                , detail: 'No hay gastos a guardar'
                , key: 'Notificacion'
                , life: 5000
              });
              return
        }

        if (this.TotalGastos == 0){
            this._MessageService.add({
                severity: 'error'
                , summary: 'Error'
                , detail: 'Total de gastos no puede ser 0'
                , key: 'Notificacion'
                , life: 5000
              });
              return
        }
        gasto.fechaInicio = this.fInicio;
        gasto.fechaFinal = this.fFin;
        gasto.gastoTotal = this.TotalGastos;
        gasto.gastoSemanalTabla = this.gastoDetalleArray;

        this._GastosService.insertNewGasto(gasto).subscribe((data:any) => {

          this.cleanInputs();
          });
    }

    cleanInputs() {
        this.mMonto = 0;
        this.tGasto = '';
        this.fFin = new Date();
        this.fInicio = new Date();
        this.comentario = '';
        this.TotalGastos = 0;
        this.mMonto = 0;
        this.gastoDetalleArray = [];
    }
}

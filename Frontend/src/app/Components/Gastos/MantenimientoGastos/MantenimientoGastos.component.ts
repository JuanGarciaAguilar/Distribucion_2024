import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { GastoDetalle, GastosModel } from 'src/app/Shared/Models/GastosModel';
import { UsuariosModel } from 'src/app/Shared/Models/UsuariosModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
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
    gastoDetalleArray: GastoDetalle[] = [];
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
        }else{
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
TotalGastos:number = 0;
    sumarGastoTotal() {
        this.TotalGastos = 0;
        debugger
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

    revisarFechaGastos(): boolean {
        this.validFechas2 = true;
        let startDate = new Date(this.fInicio).setMinutes(
            new Date(this.fInicio).getTimezoneOffset()
        );
        let endDate = new Date(this.fFin).setMinutes(
            new Date(this.fFin).getTimezoneOffset()
        );
        this.dataTempGastos.forEach((x: any) => {
            if (this.gasto.gastoSemanalId != x.gastoSemanalId) {
                if (
                    (startDate < new Date(x.fechaInicio).getTime() &&
                        endDate < new Date(x.fechaInicio).getTime()) ||
                    (startDate > new Date(x.fechaFinal).getTime() &&
                        endDate > new Date(x.fechaFinal).getTime())
                ) {
                    this.validFechas2 = this.validFechas2 && true;
                } else {
                    this.validFechas2 = this.validFechas2 && false;
                }
            }
        });
        return this.validFechas2;
    }

    revisarFechasEntreSi(): boolean {
        this.validFechas1 = true;
        let startWeekDate = new Date(this.fInicio).getUTCDay();
        if (startWeekDate == 0) {
            startWeekDate = 7;
        }
        let endWeekDate = new Date(this.fFin).getUTCDay();
        if (endWeekDate == 0) {
            endWeekDate = 7;
        }
        let startDate = new Date(this.fInicio).getTime();
        let endDate = new Date(this.fFin).getTime();
        if (startWeekDate <= endWeekDate && endDate - startDate <= 518400000) {
            this.rangeDateExceed = false;
        } else {
            this.rangeDateExceed = true;
        }
        if (this.fInicio > this.fFin) {
            this.validFechas1 = this.validFechas1 && false;
        } else {
            this.validFechas1 = this.validFechas1 && true;
        }
        return this.validFechas1;
    }

    checkVacio(val: any) {
        /* if (val == '') {
      this.mMonto = '';
      this.estadoBoton1 = true;
    } */
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
    GastosDataArray:any[]=[];
    public addGastoToArray() {
        this.gastoDet = new GastoDetalle;
        this.gastoDet.insumo = this.tGasto!;
        this.gastoDet.gasto = this.mMonto;
        this.gastoDet.comentario = this.comentario!;
        this.gastoDet.gastoSemanalId = this.idGasto;
        this.gastoDet.gastoSemanalDetalleId = this.idGastoDet;
        this.gastoDet.userId = this.tPersonal!;
        this.idGastoDet = this.idGastoDet + 1;

        this.gastoDetalleArray.push(this.gastoDet);
        this.sumarGastoTotal();
        this.cleanInputs();
        if (this.estadoBoton2 == true) {
          this.checkBotonEnviar();
        }

        this.tPersonal = '';
        this.E_Personal= true;
      }

      cleanInputs() {
        this.mMonto = 0;
        this.tGasto = '';
        this.validFechas1 = true;
        this.validFechas2 = true;
        this.validMonto = true;
        this.estadoBoton1 = true;
        this.comentario = '';
      }

}

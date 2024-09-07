import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { ClientePagosEntity } from 'src/app/Shared/Models/ClienteModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
    selector: 'app-HistorialVentas',
    templateUrl: './HistorialVentas.component.html',
    styleUrls: ['./HistorialVentas.component.css'],
    providers: [MessageService],
})
export class HistorialVentasComponent implements OnInit {
    private _Auth = inject(AuthService);
    private _VentasService = inject(VentasService);
    private _Router = inject(Router);
    private _auth = inject(AuthService);
    private _messageService = inject(MessageService);
    private _ClienteService = inject(ClienteService);

    constructor() {}

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Ventas por sector', route: '/Ventas/Sectores' },
        { label: 'Clientes por sector', route: '/Ventas/SectorCliente/'+ this._Auth.GetSectoresData().sectorId },
        { label: 'Historial de Ventas'},
    ];

    ClienteName: Message[] | undefined;
    VentasData: any;
    loading: boolean = true;

    ClienteNameModal: string = '';

    nombreClientePago: string = '';
    deudaActualizada: number = 0;
    FechaPago?: string = '';
    monto: number = 0;
    observacion: string = '';
    ClienteId: number = 0;
    VentaId: number = 0;
    PagoDeudaModal: boolean = false;
    ngOnInit() {
        this.ClienteName = [
            {
                severity: 'success',
                detail:
                    'Cliente:  ' +
                    '  ' +
                    this._Auth.GetVentasData().clienteName,
            },
        ];
        this.GetHistorialVentas();
    }

    GetHistorialVentas() {
        this._VentasService
            .getListaVentasByCliente(this._Auth.GetVentasData().clienteId)
            .subscribe(
                (data) => {
                    this.VentasData = data;
                    console.log(data);

                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                }
            );
    }

    goToEdit(data: any) {
        this.ClienteNameModal = this._Auth.GetVentasData().clienteName;
        this.VentaId = data.ventaId;
        if (data.productName == 'PAGOS') {
            this.nombreClientePago = data.clienteId;
            this.deudaActualizada = data.deudaActualizada;
            this.monto = data.amortizacion;
            this.observacion = data.observacion;
            this.ClienteId = data.clienteId;
            this.ModalAdelantoOpen(data);
        }

        if (data.productName != 'PAGOS') {
            this._Router.navigate(['/Ventas/MantenimientoVenta']);
            this._auth.SetVentasUpdateData(data);
        }
    }

    cliente_Ent?: ClientePagosEntity;
    InsertPagoAdelanto() {
        if (this.monto === 0 || this.observacion === '') {
            this._messageService.add({
                severity: 'error',
                summary: 'Notificacion',
                detail: 'Campos Vacios, llene los campos correctamente',
                key: 'Notificacion',
                life: 5000,
            });
            return;
        }

        try {
            debugger;
            this._ClienteService
                .ActualizarPago(
                    this.VentaId,
                    this.ClienteId,
                    this.monto,
                    this.observacion,
                    this._Auth.GetUsuario().usuarioId
                )
                .subscribe((data: any) => {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Notificacion',
                        detail: 'Pago procesado correctamente',
                        key: 'Notificacion',
                        life: 5000,
                    });
                    this.ModalAdelantoClose();
                    this.GetHistorialVentas();
                });
        } catch (error: any) {
            this._messageService.add({
                severity: 'error',
                summary: 'Notificacion',
                detail: error,
                key: 'Notificacion',
                life: 5000,
            });
        }
    }

    ModalAdelantoOpen(data: any) {
        this.ClienteId = data.clienteId;
        this.nombreClientePago = data.clienteName;
        this.deudaActualizada = data.deudaActualizada;
        this.PagoDeudaModal = true;
    }

    ModalAdelantoClose() {
        this.PagoDeudaModal = false;
    }
}

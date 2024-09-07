import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-HistorialAnulaciones',
  templateUrl: './HistorialAnulaciones.component.html',
  styleUrls: ['./HistorialAnulaciones.component.css'],
  providers: [MessageService],
})
export class HistorialAnulacionesComponent implements OnInit {
    private _Auth = inject(AuthService);
    private _VentasService = inject(VentasService);
    private _Router = inject(Router);
    private _auth = inject(AuthService);
    private _messageService = inject(MessageService);
    private _ClienteService = inject(ClienteService);

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Ventas por sector', route: '/Ventas/Sectores' },
        { label: 'Clientes por sector', route: '/Ventas/SectorCliente/'+ this._Auth.GetSectoresData().sectorId },
        { label: 'Historial de Anulaciones'},
    ];
    constructor() {}
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
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { VentasModel } from 'src/app/Shared/Models/VentasModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
    selector: 'app-HistorialReserva',
    templateUrl: './HistorialReserva.component.html',
    styleUrls: ['./HistorialReserva.component.css'],
    providers: [MessageService],
})
export class HistorialReservaComponent implements OnInit {
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
        { label: 'Historial de Reservas'},
    ];

    constructor() {}
    ClienteName: Message[] = [
        {
            severity: 'success',
            detail: 'Cliente:' + this._Auth.GetVentasData().clienteName,
        },
    ];
    VentasData: any;
    loading: boolean = true;

    ClienteNameModal: string = '';

    ngOnInit() {
       this.GetHistorialReservas();
    }

    ReservasData:VentasModel[]=[];
    GetHistorialReservas(){
        this._VentasService.getListaReservaByCliente(this._Auth.GetVentasData().clienteId).subscribe(
            (data) => {
                console.log('data',data);

              this.ReservasData = data;

              this.loading = false;
            }
          );
    }
}

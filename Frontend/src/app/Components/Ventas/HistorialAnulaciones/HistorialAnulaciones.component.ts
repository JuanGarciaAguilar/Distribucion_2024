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
    ClienteName: Message[] = [
        {
            severity: 'success',
            detail: 'Cliente:  ' + this._Auth.GetVentasData().clienteName,
        },
    ];

    loading: boolean = true;
    ClienteNameModal: string = '';
    nombreClientePago: string = '';

    ngOnInit() {

    }


    AnulacionesData:any;
    GetHistorialReservas(){
        this._VentasService.getListaVentasanuladasByCliente(this._Auth.GetVentasData().clienteId).subscribe(
            (data) => {
                console.log('data',data);

              this.AnulacionesData = data;

              this.loading = false;
            }
          );
    }
}

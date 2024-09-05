import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClienteModel } from 'src/app/Shared/Models/ClienteModel';
import { ReservaDia } from 'src/app/Shared/Models/reserva-diamodel';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
    selector: 'app-ListaSectorCliente',
    templateUrl: './ListaSectorCliente.component.html',
    styleUrls: ['./ListaSectorCliente.component.css'],
})
export class ListaSectorClienteComponent implements OnInit {
    private _ClienteService = inject(ClienteService);
    private _ActivatedRoute = inject(ActivatedRoute);
    private _VentasService = inject(VentasService);
    private _Router = inject(Router);

    constructor() {}
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
    items: MenuItem[] = [{ label: 'Lista de sectores' }];

    customers!: any;

    representatives!: any;

    statuses!: any[];

    loading: boolean = false;

    activityValues: number[] = [0, 100];

    searchValue: string | undefined;

    ClienteBySectorData: ClienteModel[] = [];
    ReservasData: ReservaDia[] = [];
    Buscar?: Date;
    ngOnInit() {
        this.GetClientesBySector();
        this.GetReservasSector();
    }

    async GetClientesBySector() {
        let sector = this._ActivatedRoute.snapshot.paramMap.get('id');
        await this._ClienteService
            .getclientesBySector(sector!)
            .subscribe((data: any) => {
                this.ClienteBySectorData = data;
            });
    }

    async GetReservasSector() {
        await this._VentasService.getreservas().subscribe((data: any) => {
            this.ReservasData = data;

        });
    }

    async GetReservasByDate(){
        await this._VentasService.getReservasByFecha(this.Buscar!).subscribe((data: any) => {
            this.ReservasData = data;
            console.log('reservasss',data);
        });
    }

    FiltrarReserva() {
        if (this.Buscar == null) {
          this.GetReservasSector();
        } else {
          this.GetReservasByDate();
        }
      }

}

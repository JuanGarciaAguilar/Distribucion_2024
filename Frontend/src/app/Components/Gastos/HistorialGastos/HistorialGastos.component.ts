import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GastosService } from 'src/app/Shared/Service/Gastos.service';

@Component({
    selector: 'app-HistorialGastos',
    templateUrl: './HistorialGastos.component.html',
    styleUrls: ['./HistorialGastos.component.css'],
})
export class HistorialGastosComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo Historial de Gastos' },
    ];
    private _GastosService = inject(GastosService);
    HistorialGastos: any;
    UpdateGastoModal:boolean = false;
    constructor() {}

    ngOnInit() {
        this._GastosService.getGastosAll().subscribe((data: any) => {
            this.HistorialGastos = data;
        });
    }

    OpenUpdateGastosModal(Data:any){
        console.log(Data);
        this.UpdateGastoModal =true;
    }
}

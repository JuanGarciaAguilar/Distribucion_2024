import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Shared/Service/auth.service';

@Component({
    selector: 'app-HistorialVentas',
    templateUrl: './HistorialVentas.component.html',
    styleUrls: ['./HistorialVentas.component.css'],
})
export class HistorialVentasComponent implements OnInit {
    private _Auth = inject(AuthService);
    constructor() { console.log('modulo historial ventas', this._Auth.GetVentasData());}

    ngOnInit() {

    }


}

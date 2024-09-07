import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/Shared/Service/auth.service';

@Component({
  selector: 'app-MantemientoVentas',
  templateUrl: './MantemientoVentas.component.html',
  styleUrls: ['./MantemientoVentas.component.css']
})
export class MantemientoVentasComponent implements OnInit {
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
    items: MenuItem[] = [{ label: 'Ventas' },{ label: 'Lista Clientes' },{ label: 'Nueva Venta' }];

    private _auth = inject(AuthService);

    _FormGroup: FormGroup;

    stockAc :number = 0;
    cantidadPV : number = 0;
    producto :number = 0;
    unidadDeMedida:string = '';
    precioPV : number=0;
    totalPV : number = 0;
    amortizacion :number=0;
    observacion :string = ''
    stockActual:number=0;
    CostoCompra: number= 0;
  constructor() {

    console.log('modulo historial ventas', this._auth.GetVentasUpdateData());
    this._FormGroup =  new FormGroup({
            stockAc:        new FormControl (null, [Validators.required, Validators.min(0.0)]),
            cantidadPV:     new FormControl(null, [Validators.required]),
            producto:       new FormControl(null, [Validators.required]),
            unidadDeMedida: new FormControl("", [Validators.required]),
            precioPV:       new FormControl(null, [Validators.required]),
            totalPV:        new FormControl(null, [Validators.required, Validators.min(0)]),
            amortizacion:   new FormControl(null, [Validators.required, Validators.min(0)]),
            observacion:    new FormControl(null, [Validators.required]),
  });
}
  cities:any = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];
products:any;
  ngOnInit() {
  }

}

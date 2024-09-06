import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-MantemientoVentas',
  templateUrl: './MantemientoVentas.component.html',
  styleUrls: ['./MantemientoVentas.component.css']
})
export class MantemientoVentasComponent implements OnInit {
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
    items: MenuItem[] = [{ label: 'Ventas' },{ label: 'Lista Clientes' },{ label: 'Nueva Venta' }];
  constructor() { }
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

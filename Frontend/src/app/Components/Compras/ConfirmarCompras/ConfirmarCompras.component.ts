import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ConfirmarCompras',
  templateUrl: './ConfirmarCompras.component.html',
  styleUrls: ['./ConfirmarCompras.component.css']
})
export class ConfirmarComprasComponent implements OnInit {

  items: MenuItem[] = [
    { icon: 'pi pi-home', route: '/' },
    { label: 'Historial de Compras' },
];


  constructor() { }

  ngOnInit() {
  }

}

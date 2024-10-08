import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-UnidadMedida',
  templateUrl: './UnidadMedida.component.html',
  styleUrls: ['./UnidadMedida.component.css']
})
export class UnidadMedidaComponent implements OnInit {

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de unidad de medida' },
    ];
  constructor() { }
  SectorData:any
  ngOnInit() {
  }
}

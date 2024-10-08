import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-Equivalencias',
  templateUrl: './Equivalencias.component.html',
  styleUrls: ['./Equivalencias.component.css']
})
export class EquivalenciasComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de equivalencias' },
    ];
  constructor() { }
  EquivalenciaData:any;
  ngOnInit() {
  }

}

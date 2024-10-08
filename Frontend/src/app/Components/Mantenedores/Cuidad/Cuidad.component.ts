import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-Cuidad',
  templateUrl: './Cuidad.component.html',
  styleUrls: ['./Cuidad.component.css']
})
export class CuidadComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de ciudades' },
    ];
  constructor() { }
  CuidadData:any
  ngOnInit() {
  }

}

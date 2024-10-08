import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-Sector',
  templateUrl: './Sector.component.html',
  styleUrls: ['./Sector.component.css']
})
export class SectorComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de proveedores' },
    ];
  constructor() { }
  SectorData:any
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-Proveedores',
  templateUrl: './Proveedores.component.html',
  styleUrls: ['./Proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de proveedores' },
    ];
  constructor() { }
  ProveedoresData:any;
  ngOnInit() {
  }

}

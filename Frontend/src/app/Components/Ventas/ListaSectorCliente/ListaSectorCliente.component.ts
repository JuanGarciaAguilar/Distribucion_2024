import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ListaSectorCliente',
  templateUrl: './ListaSectorCliente.component.html',
  styleUrls: ['./ListaSectorCliente.component.css']
})
export class ListaSectorClienteComponent implements OnInit {

  constructor() { }
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [
    { label: 'Lista de sectores' },
  ];

  customers!: any;

  representatives!: any;

  statuses!: any[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];

  searchValue: string | undefined;
  ngOnInit() {
  }

}

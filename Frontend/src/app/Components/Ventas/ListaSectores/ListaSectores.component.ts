import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { SectorService } from 'src/app/Shared/Service/Sector.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-ListaSectores',
  templateUrl: './ListaSectores.component.html',
  styleUrls: ['./ListaSectores.component.css'],

})
export class ListaSectoresComponent implements OnInit {

  private _VentasService = inject(VentasService);
  private _ClienteService = inject(ClienteService);
  private _SectorService = inject(SectorService);

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [
    { label: 'Lista de sectores' },
  ];
  constructor() { }
  Loading:boolean = true;
  SectorData: any;
  ngOnInit() {
    this.GetListaSectores();
  }



  async GetListaSectores() {
    await this._SectorService.getListaSector().subscribe((Sectores: any) => {
      this._ClienteService.getDeudaClientesBySector().subscribe((Deudas: any) => {
        for (let row of Sectores) {
          let deuda:any = Deudas.filter((f: any) => f.sector == row.sectorName);
          for(let item of deuda){
            if (item.deudaTotal == 0){
              row.deuda = 0;
            }
            else{
              row.deuda = item.deudaTotal;
            }
          }
        }
        this.SectorData = Sectores;
       this.Loading = false;
      });

    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { SectorService } from 'src/app/Shared/Service/Sector.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-ListaSectores',
  templateUrl: './ListaSectores.component.html',
  styleUrls: ['./ListaSectores.component.css'],

})
export class ListaSectoresComponent implements OnInit {

  private _auth = inject(AuthService);
  private _ClienteService = inject(ClienteService);
  private _SectorService = inject(SectorService);
  private _Router = inject(Router);

  items: MenuItem[] = [
    { icon: 'pi pi-home', route: '/' },
    { label: 'Ventas por sector', route: '/Ventas/Sectores' }
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

  GoListaClienteBySector(data:any){
    this._Router.navigate(['/Ventas/SectorCliente/'+ data.sectorId]);
     this._auth.SetSectoresData(data);

  }
}

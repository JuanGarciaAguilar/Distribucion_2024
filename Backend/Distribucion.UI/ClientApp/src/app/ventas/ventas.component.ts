import { Component, OnInit } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(public distribucionService: DistribucionService) { }

  ngOnInit() {
    this.distribucionService.getDeudaClientesBySector().subscribe(
      data => {
        this.deudaPorSector = data;
        this.deuda1 = this.deudaPorSector[0].deudaTotal;
        this.deuda2 = this.deudaPorSector[1].deudaTotal;
        this.deuda3 = this.deudaPorSector[2].deudaTotal;
        this.deuda4 = this.deudaPorSector[3].deudaTotal;
      },
      error => {

      }
    );
  }

  sector: any[] = [];
  deuda1: number = 0;
  deuda2: number = 0;
  deuda3: number = 0;
  deuda4: number = 0;
  deudaPorSector: any[] = [];


}

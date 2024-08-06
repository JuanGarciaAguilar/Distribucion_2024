import { Component, OnInit } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';
import { Compra } from '../Shared/compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  constructor(public distribucionService : DistribucionService) { }

  ngOnInit() {
   // this.distribucionService.changeCompra(new Compra);
  }

  nuevaCompra() {
    this.distribucionService.changeCompra(new Compra);
  }
}

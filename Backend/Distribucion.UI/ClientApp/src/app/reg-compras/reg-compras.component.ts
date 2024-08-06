import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../Shared/compra';
import { Producto } from '../Shared/Producto';
import { CompraDetalle } from '../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-reg-compras',
  templateUrl: './reg-compras.component.html',
  styleUrls: ['./reg-compras.component.css']
})
export class RegComprasComponent implements OnInit {

  constructor(public distribucionService : DistribucionService, private router : Router) { }
  validarVista: boolean = true;

  ngOnInit() {
    this.redirectFirstView();
    this.distribucionService.changeValidarCambio(this.validarVista);
    
  }

  redirectFirstView() {
    this.router.navigate(['menu/reg-compras/cab']);
  }

}

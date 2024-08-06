import { Component, OnInit, Input, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule, FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Compra } from '../../Shared/compra';
import { Producto } from '../../Shared/Producto';
import { CompraDetalle } from '../../Shared/compra-detalle';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-cab',
  templateUrl: './cab.component.html',
  styleUrls: ['./cab.component.css']
})
export class CabComponent implements OnInit {
  form: FormGroup;
  constructor(public distribucionService: DistribucionService, private router: Router, private formBuilder : FormBuilder) {

  }

  newCompra: Compra;
  compraDetalleArray: CompraDetalle[] = [];
  //Datos generales de la compra
  fCompra: Date;
  fEntrega: Date;
  origenCompra: string;
  totalCompra: number;
  fleteCompra: number;

  //Validador
  validMonto: boolean = true;


  
  ngOnInit() {
    this.distribucionService.currentCompra.subscribe(c => this.newCompra = c)
    this.inicializarCampos();
    this.form = this.formBuilder.group({
      fechaCompra: [null, Validators.required],
      fechaEntrega: [null, [Validators.required]],
      origenCompra: [null, Validators.required]
      //fleteCompra1: [null,[Validators.required,Validators.min(0)]]
    });
  }

  validarFecha() {
    if (this.fEntrega < this.fCompra) {
      this.fEntrega = null;
    }
  }

  validarMonto() {
    if (this.fleteCompra < 0) {
    }
  }

  cleanFields() {
    this.fCompra = null;
    this.fEntrega = null;
    this.origenCompra = null;
    this.fleteCompra = null;
  }

  nextComponent() {
    this.router.navigate(['menu/reg-compras/det']);
    this.newCompra.fechaCompra = this.fCompra;
    this.newCompra.fechaEntrega = this.fEntrega;
    this.newCompra.origenCompra = this.origenCompra;
    this.newCompra.costoFlete = this.fleteCompra;
    this.distribucionService.changeCompra(this.newCompra);

  }

  inicializarCampos() {
    this.fCompra = this.newCompra.fechaCompra;
    this.fEntrega = this.newCompra.fechaEntrega;
    this.origenCompra = this.newCompra.origenCompra;
    this.fleteCompra = this.newCompra.costoFlete;
    this.checkInput(this.origenCompra);
    this.checkInput(this.fleteCompra);
  }

  txtClass: string;
  checkInput(input) {
    if (input == '' || input == null) {
      this.txtClass = '';
    } else {
      this.txtClass = 'active';
    }
  }

}

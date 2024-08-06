import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DistribucionService } from '../Shared/distribucion.service';

import { Subject } from 'rxjs/Subject'
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.component.html',
  styleUrls: ['./lista-compras.component.css']
})
export class ListaComprasComponent implements OnInit {

  constructor(public distribucionService : DistribucionService, private router : Router ) { }


  ngOnInit() {
    this.router.navigate(['menu/lista-compras/list']);
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subject } from 'rxjs/Subject'
import { NgModule } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
@Component({
  selector: 'app-mantenedor-producto',
  templateUrl: './mantenedor-producto.component.html',
  styleUrls: ['./mantenedor-producto.component.css']
})
export class MantenedorProductoComponent implements OnInit {

  constructor(public distribucionService: DistribucionService, private router: Router ) { }

  ngOnInit() {
    this.router.navigate(['menu/mantenedores/producto/list']);
  }


}

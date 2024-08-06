import { Component, OnInit, Input, Output } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject'
import { NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

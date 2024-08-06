import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { FormsModule } from '@angular/forms';
import { forEach } from '@angular/router/src/utils/collection';

import { DistribucionService } from '../../Shared/distribucion.service';
import { VentaReporte } from '../../Shared/venta-reporte';

@Component({
  selector: 'app-rep-ventas-detail',
  templateUrl: './rep-ventas-detail.component.html'
})
export class RepVentasDetailComponent implements OnInit {

  public reporteDetail: VentaReporte[];
  @Input() public fechaVenta: Date;

  constructor(public distribucionService: DistribucionService) { }

  fInicio: string;
  fFin: string;

  ngOnInit() {
    this.getVentadetail(this.fechaVenta);
  }

  getVentadetail(fechaVenta: Date) {
    this.distribucionService.getVentasAll().subscribe(
      data => {
        this.reporteDetail = data as VentaReporte[];
        this.reporteDetail = this.reporteDetail.filter(p => p.fechaVenta === fechaVenta);        
      },
      err => console.error(err),
      () => console.log('loading complete')
    );
  }


  ventareporte = new VentaReporte();
}


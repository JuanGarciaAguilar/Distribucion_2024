import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteCapitalComponent } from './ReporteCapital/ReporteCapital.component';


@NgModule({
  declarations: [ReporteCapitalComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }

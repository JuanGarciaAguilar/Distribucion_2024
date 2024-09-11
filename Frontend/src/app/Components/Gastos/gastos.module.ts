import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { HistorialGastosComponent } from './HistorialGastos/HistorialGastos.component';
import { MantenimientoGastosComponent } from './MantenimientoGastos/MantenimientoGastos.component';


@NgModule({
  declarations: [HistorialGastosComponent,MantenimientoGastosComponent],
  imports: [
    CommonModule,
    GastosRoutingModule
  ]
})
export class GastosModule { }

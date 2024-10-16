import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { HistorialGastosComponent } from './HistorialGastos/HistorialGastos.component';
import { MantenimientoGastosComponent } from './MantenimientoGastos/MantenimientoGastos.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@NgModule({
    declarations: [HistorialGastosComponent, MantenimientoGastosComponent],
    imports: [
        CommonModule,
        GastosRoutingModule,
        BreadcrumbModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        DialogModule,
        ReactiveFormsModule,
        DropdownModule,
        ToastModule,
    ],
})
export class GastosModule {}

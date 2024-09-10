import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { HistorialComprasComponent } from './HistorialCompras/HistorialCompras.component';
import { MantenimientoComprasComponent } from './MantenimientoCompras/MantenimientoCompras.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { SkeletonModule } from 'primeng/skeleton';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    declarations: [HistorialComprasComponent, MantenimientoComprasComponent],
    imports: [
        CommonModule,
        ComprasRoutingModule,
        BreadcrumbModule,
        TableModule,
        SkeletonModule,
        ButtonModule,
        ToastModule,
        TabViewModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        DialogModule,
        ReactiveFormsModule,
        MessagesModule,
    ],
})
export class ComprasModule {}

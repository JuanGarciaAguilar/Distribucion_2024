import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ListaSectoresComponent } from './ListaSectores/ListaSectores.component';
import { ListaSectorClienteComponent } from './ListaSectorCliente/ListaSectorCliente.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [ListaSectoresComponent,ListaSectorClienteComponent],
  imports: [
    CommonModule,
    VentasRoutingModule,
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    DropdownModule,
    TabViewModule,
    ToastModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VentasModule { }
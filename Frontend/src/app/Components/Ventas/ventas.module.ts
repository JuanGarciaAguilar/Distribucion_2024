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
import { SkeletonModule } from 'primeng/skeleton';
import { HistorialVentasComponent } from './HistorialVentas/HistorialVentas.component';
import { HistorialReservaComponent } from './HistorialReserva/HistorialReserva.component';
import { HistorialAnulacionesComponent } from './HistorialAnulaciones/HistorialAnulaciones.component';
import { MantemientoVentasComponent } from './MantemientoVentas/MantemientoVentas.component';
import { MessagesModule } from 'primeng/messages';
import { TreeTableModule } from 'primeng/treetable';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@NgModule({
  declarations: [ListaSectoresComponent
                ,ListaSectorClienteComponent
                ,HistorialVentasComponent
                ,HistorialReservaComponent
                ,HistorialAnulacionesComponent
                ,MantemientoVentasComponent
            ],
  imports: [
                CommonModule,
                FieldsetModule,
                TreeTableModule,
                PanelModule,
                VentasRoutingModule,
                BreadcrumbModule,
                MessagesModule,
                TableModule,
                ConfirmPopupModule ,
                ButtonModule,
                InputTextModule,
                FormsModule,
                DialogModule,
                ReactiveFormsModule,
                DropdownModule,
                TabViewModule,
                ToastModule,
                SkeletonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VentasModule { }

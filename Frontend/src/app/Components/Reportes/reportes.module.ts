import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteCapitalComponent } from './ReporteCapital/ReporteCapital.component';
import { TreeTableModule } from 'primeng/treetable';
import { PanelModule } from 'primeng/panel';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReporteDiarioComponent } from './ReporteDiario/ReporteDiario.component';
import { ReporteEstadosFinancierosComponent } from './ReporteEstadosFinancieros/ReporteEstadosFinancieros.component';
import { ReporteGastosComponent } from './ReporteGastos/ReporteGastos.component';
import { ReporteIngresosComponent } from './ReporteIngresos/ReporteIngresos.component';
import { ReporteVentasComponent } from './ReporteVentas/ReporteVentas.component';
import { ReporteVentasClienteComponent } from './ReporteVentasCliente/ReporteVentasCliente.component';
import { ReporteComprasComponent } from './ReporteCompras/ReporteCompras.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    ReporteCapitalComponent,
    ReporteComprasComponent,
    ReporteDiarioComponent,
    ReporteEstadosFinancierosComponent,
    ReporteGastosComponent,
    ReporteIngresosComponent,
    ReporteVentasComponent,
    ReporteVentasClienteComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    TreeTableModule,
    SelectButtonModule,
    PanelModule,
    ToastModule,
    BreadcrumbModule,
    MessagesModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
  ]
})
export class ReportesModule { }

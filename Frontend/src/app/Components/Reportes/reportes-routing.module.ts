import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteCapitalComponent } from './ReporteCapital/ReporteCapital.component';
import { ReporteComprasComponent } from './ReporteCompras/ReporteCompras.component';
import { ReporteDiarioComponent } from './ReporteDiario/ReporteDiario.component';
import { ReporteEstadosFinancierosComponent } from './ReporteEstadosFinancieros/ReporteEstadosFinancieros.component';
import { ReporteGastosComponent } from './ReporteGastos/ReporteGastos.component';
import { ReporteIngresosComponent } from './ReporteIngresos/ReporteIngresos.component';
import { ReporteVentasClienteComponent } from './ReporteVentasCliente/ReporteVentasCliente.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'ReporteCapital',
                component: ReporteCapitalComponent,
            },
            {
              path:'SectorCliente/:id',
              component: ReporteComprasComponent
            },
            {
              path:'MantenimientoVenta',
              component: ReporteDiarioComponent
            },
            {
              path:'HistorialVentas',
              component: ReporteEstadosFinancierosComponent
            },
            {
              path:'HistorialReservas',
              component: ReporteGastosComponent
            },
             {
              path:'HistorialAnulaciones',
              component: ReporteIngresosComponent
            },
            {
              path:'HistorialAnulaciones',
              component: ReporteVentasClienteComponent
            },
            {
                path:'HistorialAnulaciones',
                component: ReporteVentasClienteComponent
              }
        ],

    },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

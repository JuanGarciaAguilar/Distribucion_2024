import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteCapitalComponent } from './ReporteCapital/ReporteCapital.component';
import { ReporteComprasComponent } from './ReporteCompras/ReporteCompras.component';
import { ReporteDiarioComponent } from './ReporteDiario/ReporteDiario.component';
import { ReporteEstadosFinancierosComponent } from './ReporteEstadosFinancieros/ReporteEstadosFinancieros.component';
import { ReporteGastosComponent } from './ReporteGastos/ReporteGastos.component';
import { ReporteIngresosComponent } from './ReporteIngresos/ReporteIngresos.component';
import { ReporteVentasClienteComponent } from './ReporteVentasCliente/ReporteVentasCliente.component';
import { ReporteVentasComponent } from './ReporteVentas/ReporteVentas.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'ReporteCapitalTotal',
                component: ReporteCapitalComponent,
            },
            {
              path:'ReporteCompras',
              component: ReporteComprasComponent
            },
            {
              path:'ReporteDiario',
              component: ReporteDiarioComponent
            },
            {
              path:'ReporteEstadoFinanciero',
              component: ReporteEstadosFinancierosComponent
            },
            {
              path:'ReporteGastos',
              component: ReporteGastosComponent
            },
             {
              path:'ReporteIngresos',
              component: ReporteIngresosComponent
            },
            {
              path:'ReporteVentasCliente',
              component: ReporteVentasClienteComponent
            },
            {
                path:'ReporteVentas',
                component: ReporteVentasComponent
              }
        ],

    },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

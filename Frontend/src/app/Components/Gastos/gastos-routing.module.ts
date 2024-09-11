import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoGastosComponent } from './MantenimientoGastos/MantenimientoGastos.component';
import { HistorialGastosComponent } from './HistorialGastos/HistorialGastos.component';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'Registro',
              component: MantenimientoGastosComponent,
          },
          {
            path:'Historial',
            component: HistorialGastosComponent
          },
          
      ],

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule { }

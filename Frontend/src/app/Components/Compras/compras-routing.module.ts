import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComprasComponent } from './HistorialCompras/HistorialCompras.component';
import { MantenimientoComprasComponent } from './MantenimientoCompras/MantenimientoCompras.component';
import { ConfirmarComprasComponent } from './ConfirmarCompras/ConfirmarCompras.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Registro',
        component: MantenimientoComprasComponent,
      },
      {
        path: 'Historial',
        component: HistorialComprasComponent,
      },
      {
        path: 'ConfirmarCompra',
        component: ConfirmarComprasComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }

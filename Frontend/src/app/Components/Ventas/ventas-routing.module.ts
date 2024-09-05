import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSectoresComponent } from './ListaSectores/ListaSectores.component';
import { ListaSectorClienteComponent } from './ListaSectorCliente/ListaSectorCliente.component';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'Sectores',
              component: ListaSectoresComponent,
          },
          {
            path:'SectorCliente/:id',
            component: ListaSectorClienteComponent
          }
      ],

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }

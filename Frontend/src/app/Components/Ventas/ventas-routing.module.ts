import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaSectoresComponent } from './ListaSectores/ListaSectores.component';
import { ListaSectorClienteComponent } from './ListaSectorCliente/ListaSectorCliente.component';
import { HistorialVentasComponent } from './HistorialVentas/HistorialVentas.component';
import { HistorialReservaComponent } from './HistorialReserva/HistorialReserva.component';  
import { MantemientoVentasComponent } from './MantemientoVentas/MantemientoVentas.component';  

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
          },
          {
            path:'MantenimientoVenta',
            component: MantemientoVentasComponent
          },
          {
            path:'HistorialVentas',
            component: HistorialVentasComponent
          },
          {
            path:'HistorialReservas',
            component: HistorialReservaComponent
          },
         
      ],

  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }

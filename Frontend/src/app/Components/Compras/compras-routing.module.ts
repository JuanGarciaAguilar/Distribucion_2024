import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialComprasComponent } from './HistorialCompras/HistorialCompras.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'nueva',
                component: HistorialComprasComponent,
            },

        ],

    },
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }

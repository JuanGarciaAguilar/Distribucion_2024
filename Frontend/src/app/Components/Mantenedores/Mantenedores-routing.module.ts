import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ProductosComponent } from './Productos/Productos.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Productos',
                component: ProductosComponent,
            },
        ],

    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenedoresRoutingModule { }

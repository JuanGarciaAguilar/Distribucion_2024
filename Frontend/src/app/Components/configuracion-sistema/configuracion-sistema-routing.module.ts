import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Permisos',
                component: PermisosComponent,
            },

        ],

    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionSistemaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ProductosComponent } from './Productos/Productos.component';
import { ClientesComponent } from './Clientes/Clientes.component';
import { CuidadComponent } from './Cuidad/Cuidad.component';
import { EquivalenciasComponent } from './Equivalencias/Equivalencias.component';
import { ProveedoresComponent } from './Proveedores/Proveedores.component';
import { SectorComponent } from './Sector/Sector.component';
import { UnidadMedidaComponent } from './UnidadMedida/UnidadMedida.component';
import { UsuariosComponent } from './Usuarios/Usuarios.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'Clientes',
                component: ClientesComponent,
            },
            {
                path: 'Ciudad',
                component: CuidadComponent,
            },
            {
                path: 'Equivalencias',
                component: EquivalenciasComponent,
            },
            {
                path: 'Productos',
                component: ProductosComponent,
            },
            {
                path: 'Proveedores',
                component: ProveedoresComponent,
            },
            {
                path: 'Sectores',
                component: SectorComponent,
            },
            {
                path: 'UnidadMedida',
                component: UnidadMedidaComponent,
            },
            {
                path: 'Usuarios',
                component: UsuariosComponent,
            },
        ],

    },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenedoresRoutingModule { }

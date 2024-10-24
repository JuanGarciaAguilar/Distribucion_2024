import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './Productos/Productos.component';
import { MantenedoresRoutingModule } from './Mantenedores-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ClientesComponent } from './Clientes/Clientes.component';
import { CuidadComponent } from './Cuidad/Cuidad.component';
import { EquivalenciasComponent } from './Equivalencias/Equivalencias.component';
import { ProveedoresComponent } from './Proveedores/Proveedores.component';
import { SectorComponent } from './Sector/Sector.component';
import { UnidadMedidaComponent } from './UnidadMedida/UnidadMedida.component';
import { UsuariosComponent } from './Usuarios/Usuarios.component';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        CommonModule,
        MantenedoresRoutingModule,
        BreadcrumbModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        DialogModule,
        ConfirmPopupModule,
        ChipModule,
        MessagesModule,
        ReactiveFormsModule,
        DropdownModule,
        ToastModule,
        DividerModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        ProductosComponent,
        ClientesComponent,

        CuidadComponent,
        EquivalenciasComponent,
        ProveedoresComponent,
        SectorComponent,
        UnidadMedidaComponent,
        UsuariosComponent,
    ],
})
export class MantenedoresModule {}

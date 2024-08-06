import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionSistemaRoutingModule } from './configuracion-sistema-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import { DialogModule } from 'primeng/dialog';
import { PermisosComponent } from './permisos/permisos.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
/* import { ProgressSpinnerModule } from 'primeng/progressSpinner'; */

@NgModule({
  declarations: [PermisosComponent],
  imports: [
    CommonModule,
    TabViewModule,
    TreeModule,
    ListboxModule,
    DialogModule,
    ConfiguracionSistemaRoutingModule,
/*     ProgressSpinnerModule, */
    ToolbarModule,
    ButtonModule,
    InputTextModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ConfiguracionSistemaModule { }

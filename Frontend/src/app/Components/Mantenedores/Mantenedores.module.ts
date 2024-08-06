import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ProductosComponent } from './Productos/Productos.component';
import { MantenedoresRoutingModule } from './Mantenedores-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
  imports: [
    CommonModule,
    MantenedoresRoutingModule,
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ProductosComponent]
})
export class MantenedoresModule { }

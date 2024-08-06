import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-PE';
registerLocaleData(localeEs, 'es-PE');
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VentasComponent } from './ventas/ventas.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
//import { ClientesComponent } from './clientes/clientes.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { DistribucionService } from './Shared/distribucion.service';
import { FilterPipe } from './clientes/FilterPipe';
import { GastosComponent } from './gastos/gastos.component';
import { RegGastosComponent } from './reg-gastos/reg-gastos.component';
import { ComprasComponent } from './compras/compras.component';
import { RegComprasComponent } from './reg-compras/reg-compras.component';
//import { ProductoComponent } from './producto/producto.component';
//import { UsuarioComponent } from './usuario/usuario.component'; 
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { CabComponent } from './reg-compras/cab/cab.component';
import { DetComponent } from './reg-compras/det/det.component';
import { ResComponent } from './reg-compras/res/res.component';
import { ListaGastosComponent } from './lista-gastos/lista-gastos.component';
import { ForbiddenValidatorDirective } from './Shared/validaciones.directive';
import { HistorialVentasComponent } from './historial-ventas/historial-ventas.component';
import { CommonComponent } from './common/common.component';
import { EditComprasComponent } from './lista-compras/edit-compras/edit-compras.component';
import { ListAllComponent } from './lista-compras/list-all/list-all.component';
import { ReportesComponent } from './reportes/reportes.component';
import { RepCapitalComponent } from './reportes/rep-capital/rep-capital.component';
import { RepComprasComponent } from './reportes/rep-compras/rep-compras.component';
import { RepVentasComponent } from './reportes/rep-ventas/rep-ventas.component';
import { RepGastosComponent } from './reportes/rep-gastos/rep-gastos.component';
import { RepGananciaComponent } from './reportes/rep-ganancia/rep-ganancia.component';
import { PrincipalComponent } from './principal/principal.component';
import { CookieService } from 'ngx-cookie-service';
import { CliSectorComponent } from './cli-sector/cli-sector.component';

import { ProductDetailComponent } from './producto/product-detail.component';
import { RepVentasDetailComponent } from './reportes/rep-ventas/rep-ventas-detail.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ConfirmarComprasComponent } from './lista-compras/confirmar-compras/confirmar-compras.component';

import { AuthService } from './interceptors/auth.service';
import { ProductoEditComponent } from './mantenedores/mantenedor-producto/producto-edit/producto-edit.component';
import { MantenedoresComponent } from './mantenedores/mantenedores.component';
import { MantenedorUsuarioComponent } from './mantenedores/mantenedor-usuario/mantenedor-usuario.component';
import { MantenedorClienteComponent } from './mantenedores/mantenedor-cliente/mantenedor-cliente.component';
import { MantenedorProductoComponent } from './mantenedores/mantenedor-producto/mantenedor-producto.component';
import { MantenedorCategoriaComponent } from './mantenedores/mantenedor-categoria/mantenedor-categoria.component';
import { MantenedorSummaryComponent } from './mantenedores/mantenedor-summary/mantenedor-summary.component';
import { ProductoListComponent } from './mantenedores/mantenedor-producto/producto-list/producto-list.component';
import { RepCierreDiarioComponent } from './reportes/rep-cierre-diario/rep-cierre-diario.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VentasComponent,
    NavFooterComponent,
    //ClientesComponent,
    ListaProductosComponent,
    FilterPipe,
    GastosComponent,
    RegGastosComponent,
    ListaGastosComponent,
    ComprasComponent,
    RegComprasComponent,
    ListaComprasComponent,
    CabComponent,
    DetComponent,
    ResComponent,
    ForbiddenValidatorDirective,
    //ProductoComponent,
    ProductDetailComponent,
    HistorialVentasComponent,
    //ProductoComponent,
    //UsuarioComponent,
    EditComprasComponent,
    ListAllComponent,
    CommonComponent,
    ReportesComponent,
    RepCapitalComponent,
    RepComprasComponent,
    RepVentasComponent,
    RepVentasDetailComponent,
    RepGastosComponent,
    RepGananciaComponent,
    PrincipalComponent,
    MantenedoresComponent,
    MantenedorUsuarioComponent,
    MantenedorClienteComponent,
    MantenedorProductoComponent,
    MantenedorCategoriaComponent,
    CliSectorComponent,
    ConfirmarComprasComponent,
    ProductoEditComponent,
    MantenedorSummaryComponent,
    ProductoListComponent,
    RepCierreDiarioComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpModule, HttpClientModule, BrowserModule, ReactiveFormsModule,
    GridModule,
    FormsModule, 
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },      
      { path: 'menu', component: NavMenuComponent,
        children: [
          { path: '', redirectTo: 'principal', pathMatch: 'full' },
          { path: 'principal', component: PrincipalComponent },
          { path: 'ventas', component: VentasComponent },
          { path: 'reportes', component: ReportesComponent},
          { path: 'rep-compras', component: RepComprasComponent },
          { path: 'rep-ganancia', component: RepGananciaComponent },
          { path: 'rep-gastos', component: RepGastosComponent },
          { path: 'rep-ventas', component: RepVentasComponent },
          { path: 'rep-capital', component: RepCapitalComponent },
          { path: 'rep-cierre-diario', component: RepCierreDiarioComponent },
          //{ path: 'clientes', component: ClientesComponent },
          { path: 'clientes-sector/:sectorURL', component: CliSectorComponent },
          { path: 'lista-productos/:sectorURL/:clienteURL', component: ListaProductosComponent },
          //{ path: 'usuario', component: UsuarioComponent },      
          { path: 'gastos', component: GastosComponent },
          { path: 'reg-gastos', component: RegGastosComponent },
          { path: 'lista-gastos', component: ListaGastosComponent },
          { path: 'compras', component: ComprasComponent },
          { path: 'historial-ventas/:sectorURL/:clienteURL', component: HistorialVentasComponent },
 
          { path: 'reg-compras', component: RegComprasComponent,
            children: [
              { path: '', redirectTo: 'cab', pathMatch: 'full' },
              { path: 'cab', component: CabComponent },
              { path: 'det', component: DetComponent },
              { path: 'res', component: ResComponent },
              { path: '**', redirectTo: 'cab', pathMatch: 'full' }
            ] },
          { path: 'lista-compras', component: ListaComprasComponent,
            children: [
              { path: '', redirectTo: 'list', pathMatch: 'full' },
              { path: 'edit', component: EditComprasComponent },
              { path: 'list', component: ListAllComponent },
              { path: 'verificar', component: ConfirmarComprasComponent },
              { path: '**', redirectTo: 'list', pathMatch: 'full' }
            ]
          },
          {
            path: 'mantenedores', component: MantenedoresComponent,
            children: [
              { path: '', redirectTo: 'summary', pathMatch: 'full' },
              { path: 'summary', component: MantenedorSummaryComponent },
              { path: 'categoria', component: MantenedorCategoriaComponent },
              { path: 'categoria', component: MantenedorCategoriaComponent },
              { path: 'cliente', component: MantenedorClienteComponent },
              { path: 'producto', component: MantenedorProductoComponent,
                children: [
                  { path: '', redirectTo: 'list', pathMatch: 'full' },
                  { path: 'list', component: ProductoListComponent },
                  { path: 'edit', component: ProductoEditComponent }
                ]},
              { path: 'usuario', component: MantenedorUsuarioComponent },
              { path: '**', redirectTo: 'summary', pathMatch: 'full' }
            ]
          },

          { path: 'lista-gastos', component: ListaGastosComponent },
          { path: '**', redirectTo: 'principal', pathMatch: 'full' }

        ]
      }
    ])
  ], 
  providers: [CookieService,
    DistribucionService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },
    FilterPipe,
    { provide: LOCALE_ID, useValue: 'es-PE' }],
    bootstrap: [AppComponent]

})
export class AppModule { }

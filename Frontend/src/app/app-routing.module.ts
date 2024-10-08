import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
/*
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
 */
const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [

            { path: '', loadChildren: () => import('../app/Components/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'Accesos', loadChildren: () => import('../app/Components/configuracion-sistema/configuracion-sistema.module').then(m => m.ConfiguracionSistemaModule)},
            { path: 'Mantenedores', loadChildren: () => import('../app/Components/Mantenedores/Mantenedores.module').then(m => m.MantenedoresModule)},
            { path: 'Ventas', loadChildren: () => import('../app/Components/Ventas/ventas.module').then(m => m.VentasModule)},
            { path: 'Compras', loadChildren: () => import('../app/Components/Compras/compras.module').then(m => m.ComprasModule)},
            { path: 'Reportes', loadChildren: () => import('../app/Components/Reportes/reportes.module').then(m => m.ReportesModule)},
            { path: 'Gastos', loadChildren: () => import('../app/Components/Gastos/gastos.module').then(m => m.GastosModule)}
        ]
    },
    //{ path: 'Dashboard', loadChildren: () => import('../app/Components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'auth', loadChildren: () => import('../app/Components/auth/auth.module').then(m => m.AuthModule) },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule],
  })
export class AppRoutingModule {
}

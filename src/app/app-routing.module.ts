import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedienteComponent } from './demo/pages/expediente/expediente.component';
import { ThemeHorizontalComponent } from './demo/pages/layout/theme-horizontal/theme-horizontal.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'autenticar',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
      },
      {
        path: 'sample-page',
        loadChildren: () => import('./demo/pages/sample-page/sample-page.module').then(module => module.SamplePageModule)
      },
      {
        path: 'menu-principal',
        loadChildren: () => import('./demo/pages/layout/theme-horizontal/theme-horizontal.module').then(module => module.ThemeHorizontalModule)
      },
      {
        path: 'autenticar',
        loadChildren: () => import('./demo/pages/autenticar/autenticar.module').then(module => module.AutenticarModule)
      },
      {
        path: 'planilla',
        loadChildren: () => import('./demo/pages/planilla/planilla.module').then(module => module.PlanillaModule)
      },
      {
        path: 'accionPersonal',
        loadChildren: () => import('./demo/pages/accion-personal/accionpersonal.module').then(module => module.AccionPersonalModule)
      },
      {
        path: 'cita',
        loadChildren: () => import('./demo/pages/citas/cita.module').then(module => module.CitaModule)
      },
      {
        path: 'datos',
        loadChildren: () => import('./demo/pages/datos/datos.module').then(module => module.DatosModule)
      },
      {
        path: 'prestamo',
        loadChildren: () => import('./demo/pages/prestamo/prestamo.module').then(module => module.PrestamoModule)
      },{
        path: 'capacitacion',
        loadChildren: () => import('./demo/pages/accion/accion.module').then(module => module.AccionModule)
      },{
        path: 'vacacion',
        loadChildren: () => import('./demo/pages/vacacion/vacacion.module').then(module => module.VacacionModule)
      },{
        path: 'expediente', loadChildren: () => import('./demo/pages/expediente/expediente.module').then(module => module.ExpedienteModule)
      }
    ]

  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

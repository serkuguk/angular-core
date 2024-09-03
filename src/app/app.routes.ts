import { Routes } from '@angular/router';
import {loggedGuard, redirectLoggedInGuard} from '@pages/auth/services/auth.guard';
import {LoginComponent} from "@pages/auth/components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectLoggedInGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@pages/basic-example/components/tables/tables.component').then(c => c.TablesComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/tables',
    loadComponent: () => import('@pages/basic-example/components/tables/tables.component').then(c => c.TablesComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/buttons',
    loadComponent: () => import('@pages/basic-example/components/buttons/buttons.component').then(c => c.ButtonsComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/selects',
    loadComponent: () => import('@pages/basic-example/components/selectors/selectors.component').then(c => c.SelectorsComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/charts',
    loadComponent: () => import('@pages/basic-example/components/charts/charts.component').then(c => c.ChartsComponent),
    canActivate: [loggedGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound-page/notfound-page.component').then(c => c.NotfoundPageComponent)
  }
];

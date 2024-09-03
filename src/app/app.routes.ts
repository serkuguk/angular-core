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
    loadComponent: () => import('@pages/basic-example/components/tables/tables.component').then(m => m.TablesComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/tables',
    loadComponent: () => import('@pages/basic-example/components/tables/tables.component').then(m => m.TablesComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/buttons',
    loadComponent: () => import('@pages/basic-example/components/buttons/buttons.component').then(m => m.ButtonsComponent),
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples/selects',
    loadComponent: () => import('@pages/basic-example/components/selectors/selectors.component').then(m => m.SelectorsComponent),
    canActivate: [loggedGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound-page/notfound-page.component').then(m => m.NotfoundPageComponent)
  }
];

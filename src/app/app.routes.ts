import { Routes } from '@angular/router';
import {authGuard} from '@pages/auth/services/auth.guard';
import {LoginComponent} from "@pages/auth/components/login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'basic-examples',
    loadComponent: () => import('@pages/basic-example/components/basic-layout-example/basic-layout-example.component').then(m => m.BasicLayoutExampleComponent),
    canActivate: [authGuard]
  },
  {
    path: 'basic-examples/tables',
    loadComponent: () => import('@pages/basic-example/components/tables/tables.component').then(m => m.TablesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'basic-examples/buttons',
    loadComponent: () => import('@pages/basic-example/components/buttons/buttons.component').then(m => m.ButtonsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'basic-examples/selects',
    loadComponent: () => import('@pages/basic-example/components/selectors/selectors.component').then(m => m.SelectorsComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound-page/notfound-page.component').then(m => m.NotfoundPageComponent)
  }
];

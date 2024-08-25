import { Routes } from '@angular/router';
import {authGuard} from '@pages/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic-example',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/components/login/login.component').then(m => m.LoginComponent),
    //canMatch: [isAuthCanMach]
  },
  {
    path: 'basic-example',
    loadComponent: () => import('./pages/basic-example/components/basic-example/basic-example.component').then(m => m.BasicExampleComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/notfound-page/notfound-page.component').then(m => m.NotfoundPageComponent)
  }
];

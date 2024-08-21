import { Routes } from '@angular/router';
import { authGuard } from '@pages/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/components/login/login.component').then(c => c.LoginComponent),
  },
  {
    path: 'basic-example',
    loadComponent: () => import('./pages/basic-example/components/basic-example/basic-example.component').then(c => c.BasicExampleComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];
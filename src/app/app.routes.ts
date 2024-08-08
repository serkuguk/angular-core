import { Routes } from '@angular/router';
import { authGuard } from './pages/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'basic-example',
    loadChildren: () => import('./pages/basic-example/basic-example.module').then(m => m.BasicExampleModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];

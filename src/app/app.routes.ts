import { Routes } from '@angular/router';
import {
  isAuthCanMach,
  loggedGuard,
  redirectLoggedInGuard
} from '@pages/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/components/login/login.component').then(c => c.LoginComponent),
    canActivate: [redirectLoggedInGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@pages/home/home.component').then(c => c.HomeComponent),
    canMatch: [isAuthCanMach],
    canActivate: [loggedGuard]
  },
  {
    path: 'basic-examples',
    canMatch: [isAuthCanMach],
    canActivate: [loggedGuard],
    children: [
      {
        path: 'tables',
        loadComponent: () => import('@pages/basic-example/components/tables/tables.component').then(c => c.TablesComponent),
      },
      {
        path: 'button',
        loadComponent: () => import('@pages/basic-example/components/buttons/buttons.component').then(c => c.ButtonsComponent),
      },
      {
        path: 'selects',
        loadComponent: () => import('@pages/basic-example/components/selectors/selectors.component').then(c => c.SelectorsComponent),
      },
      {
        path: 'charts',
        loadComponent: () => import('@pages/basic-example/components/charts/charts.component').then(c => c.ChartsComponent),
      },
      {
        path: 'forms',
        loadComponent: () => import('@pages/basic-example/components/forms/forms.component').then(c => c.FormsComponent),
      },
      {
        path: 'stepper',
        loadComponent: () => import('@pages/basic-example/components/stepper/stepper.component').then(c => c.StepperComponent),
      },
      {
        path: 'calendar',
        loadComponent: () => import('@pages/basic-example/components/calendar/calendar').then(c => c.CalendarExampleComponent),
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('@pages/notfound-page/notfound-page.component').then(c => c.NotfoundPageComponent)
  }
];

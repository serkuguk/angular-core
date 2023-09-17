import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      children: [
          {
              path: 'basic-example',
              loadChildren: () => import('./pages/basic-example/basic-example.module').then(m => m.BasicExampleModule)
          },
          {
              path: '',
              pathMatch: 'full',
              redirectTo: 'static/welcome'
          }
      ]
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/static/404'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

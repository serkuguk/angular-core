import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicExampleComponent } from './components/basic-example/basic-example.component';

const routes: Routes = [
  {
    path: '',
    component: BasicExampleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicExampleRoutingModule { }

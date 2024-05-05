import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BasicExampleRoutingModule } from '../../basic-example-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    BasicExampleRoutingModule
  ],
  exports: []
})
export class BasicExampleModule { }

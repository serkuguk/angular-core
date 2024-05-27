import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BasicExampleRoutingModule } from '../../basic-example-routing.module';
import { DynamicTableModule } from 'src/app/shared/components/dynamic-table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    BasicExampleRoutingModule,
    DynamicTableModule
  ],
  exports: []
})
export class BasicExampleModule { }

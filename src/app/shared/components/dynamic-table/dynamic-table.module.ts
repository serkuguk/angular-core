import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { TuiTableModule } from '@taiga-ui/addon-table';


@NgModule({
  declarations: [DynamicTableComponent],
  providers: [],
  imports: [
    CommonModule,
    TuiTableModule
  ],
  exports:[DynamicTableComponent]
})
export class DynamicTableModule { }

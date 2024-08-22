import { TuiTable } from "@taiga-ui/addon-table";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';

@NgModule({
  declarations: [DynamicTableComponent],
  providers: [],
  imports: [
    CommonModule,
    ...TuiTable
  ],
  exports:[DynamicTableComponent]
})
export class DynamicTableModule { }

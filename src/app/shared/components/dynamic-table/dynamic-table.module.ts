import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTableComponent } from './dynamic-table.component';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableHeaderDirective } from './directives/table-header.directive';

@NgModule({
  declarations: [DynamicTableComponent, TableCellDirective, TableHeaderDirective],
  providers: [],
  imports: [
    CommonModule
  ],
  exports:[DynamicTableComponent, TableCellDirective, TableHeaderDirective]
})
export class DynamicTableModule { }

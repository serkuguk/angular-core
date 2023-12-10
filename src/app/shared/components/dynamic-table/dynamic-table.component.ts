import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { TableHeaderDirective } from './directives/table-header.directive';
import { TableCellDirective } from './directives/table-cell.directive';
@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent {

  @Input() selectedRow: any;
  @Input() dataSource: {[key: string]: any}[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnWidths: {[key: string]: string} = {};
  @Output() selectRow = new EventEmitter<{row:unknown, selected:boolean}>();

  selectedRowBoolean: boolean | undefined;

  @ContentChildren(TableHeaderDirective) headerTemplates!: QueryList<TableHeaderDirective>;
  @ContentChildren(TableCellDirective) cellTemplates!: QueryList<TableCellDirective>;

  getHeaderTemplate(colName: string): TemplateRef<any> | undefined {
    return this.headerTemplates.find(item => item.appTableHeader === colName)?.templateRef;
  }

  getCellTemplate(colName: string): TemplateRef<any> | undefined {
    return this.cellTemplates.find(item => item.appTableCell === colName)?.templateRef;
  }

  changeTableRowColor(row: any) { 
    if(this.selectedRow?.id === row.id) {
      this.selectedRow = null;
      this.selectedRowBoolean = false;
    } else {
      this.selectedRow = row;
      this.selectedRowBoolean = true;
    }

    this.selectRow.emit({row: this.selectedRow, selected: this.selectedRowBoolean});
  }
}

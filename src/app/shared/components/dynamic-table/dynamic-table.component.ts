import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  readonly data = [
    {
        name: 'Alex Inkin',
        balance: 1323525,
    },
    {
        name: 'Roman Sedov',
        balance: 423242,
    },
  ] as const;

  readonly columns = Object.keys(this.data[0]);
}

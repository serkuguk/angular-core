import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {TuiContext, TuiLet, TuiStringHandler} from "@taiga-ui/cdk";
import {TuiTable, TuiTableCell, TuiTableHead, TuiTableTd, TuiTableTh, TuiTableTr} from "@taiga-ui/addon-table";
import {TuiPagination} from "@taiga-ui/kit";


@Component({
  selector: 'basic-table',
  standalone: true,
  imports: [
    CommonModule,
    ...TuiTable,
    TuiLet,
    TuiPagination
  ],
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {

  @Input() selectedRow: any;
  @Input() dataSource: any[] = [];
  @Input() columns: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnWidths: {[key: string]: string} = {};
  @Output() selectRow = new EventEmitter<{row:unknown, selected:boolean}>();

  protected index = 4;
  protected length = 10;
  protected size = 10;
  protected readonly items = [10, 50, 100];
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({$implicit}) => `${$implicit} items per page`;
}

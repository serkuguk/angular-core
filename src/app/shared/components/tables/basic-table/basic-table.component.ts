import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from "@angular/common";
import {
  TuiContext,
  TuiLet,
  TuiStringHandler
} from "@taiga-ui/cdk";
import {TuiTable, TuiTablePagination, TuiTablePaginationEvent} from "@taiga-ui/addon-table";
import {TuiButton, TuiScrollable, TuiScrollbar, TuiTextfield} from '@taiga-ui/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {TuiButtonSelect, TuiDataListWrapper, TuiPagination} from '@taiga-ui/kit';

@Component({
  selector: 'basic-table',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TuiScrollable,
    TuiScrollbar,
    TuiLet,
    TuiTable,
    TuiTablePagination,
    TuiPagination,
    TuiButton,
    TuiButtonSelect,
    TuiDataListWrapper,
    TuiTextfield
  ],
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {

  @Input() selectedRow: any;
  @Input() dataSource: any[] = [];
  @Input() columns: any[] = [];
  //public columns = input<any[]>([]);

  @Input() displayedColumns: string[] = [];
  @Input() columnWidths: {[key: string]: string} = {};
  @Output() selectRow = new EventEmitter<{row:unknown, selected:boolean}>();

  protected index = 4;
  protected size = 10;
  protected readonly items = [10, 50, 100];
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({$implicit}) => `${$implicit} items per page`;

  private readonly size$ = new BehaviorSubject(10);
  private readonly page$ = new BehaviorSubject(0);

  protected onPagination({page, size}: TuiTablePaginationEvent): void {

  }
}

import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf, NgIf} from "@angular/common";
import {
  TuiContext,
  TuiLet,
  TuiStringHandler
} from "@taiga-ui/cdk";
import {TuiTable, TuiTablePagination, TuiTablePaginationEvent} from "@taiga-ui/addon-table";
import {
  TuiButton,
  TuiScrollbar,
  TuiScrollbarDirective, tuiScrollbarOptionsProvider,
  TuiSizeL,
  TuiSizeS,
  TuiTextfield
} from '@taiga-ui/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
    TuiScrollbar,
    TuiLet,
    TuiTable,
    TuiTablePagination,
    TuiPagination,
    TuiButton,
    TuiButtonSelect,
    TuiDataListWrapper,
    TuiTextfield,
    TuiScrollbarDirective
  ],
  providers: [
    tuiScrollbarOptionsProvider({
      mode: 'hover',
    }),
  ],
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {

  public selectedRow = input<any[]>([]);
  public resizable = input<boolean>(true);
  public tableSize = input<TuiSizeL | TuiSizeS>("m");
  public scrollBar = input<"horizontal" | "vertical">("horizontal");
  public dataSource = input<any[]>([]);
  public titleColumn = input<any>({});
  public selectRow = output<any[]>();
  protected selected: any = null;

  protected get columns(): string[] {
    return Object.keys(this.dataSource()[0] ?? {});
  }

  protected index = 0;
  protected size = 5;
  protected readonly items = [10, 50, 100];
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({$implicit}) => `${$implicit} items per page`;

  protected get paginatedData(): any[] {
    const start = this.index * this.size;
    const end = start + this.size;
    return this.dataSource().slice(start, end);
  }

  protected toggleRowSelection(row: any): void {
    if (this.selected === row) {
      this.selected = null;
    } else {
      this.selected = row;
    }
  }

  protected get displayedRowsRange(): string {
    const start = this.index * this.size + 1;
    const end = Math.min((this.index + 1) * this.size, this.dataSource().length);
    return `${start}-${end}`;
  }

  protected readonly Math = Math;
}

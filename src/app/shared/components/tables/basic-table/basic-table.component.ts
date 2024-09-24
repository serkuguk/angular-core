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

  protected get columns(): string[] {
    return Object.keys(this.dataSource()[0] ?? {});
  }

  protected index = 4;
  protected size = 10;
  protected readonly items = [10, 50, 100];
  protected readonly content: TuiStringHandler<TuiContext<number>> = ({$implicit}) => `${$implicit} items per page`;

}

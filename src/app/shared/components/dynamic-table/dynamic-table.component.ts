import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {TuiTableModule} from "@taiga-ui/addon-table";
import type {TuiLetContext, TuiLetModule, TuiStringHandler} from "@taiga-ui/cdk";


@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    TuiTableModule],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicTableComponent {

  @Input() selectedRow: any;
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnWidths: {[key: string]: string} = {};
  @Output() selectRow = new EventEmitter<{row:unknown, selected:boolean}>();

  readonly columns: any[] = Object.keys(this.dataSource);

  protected index = 4;
  protected length = 10;
  protected size = 10;
  protected readonly items = [10, 50, 100];
  protected readonly content: TuiStringHandler<TuiLetContext<number>> = ({$implicit}) => `${$implicit} items per page`;
}

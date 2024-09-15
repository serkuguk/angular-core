import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {basic_data as dataSource,
  basic_columns,
  editable_columns,
  basic_select_items} from '../../config/config-table'
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import {DynamicTableComponent} from "@shared/components/tables/basic-table/basic-table.component";
import {EditableTableComponent} from "@shared/components/tables/editable-table/editable-table.component";
import {SelectComponent} from "@shared/components/controls/select/select.component";

@Component({
  selector: 'app-tables',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DynamicTableComponent,
    EditableTableComponent,
    SelectComponent,
    TuiRoot,
    TuiDialog,
    TuiAlert
  ],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {

  public dataSource: any[] = [];
  public basic_columns: any[] = [];
  public editable_columns: any[] = [];
  public basic_select_items: any[] = [];
  private store: Store<fromAuth.State> = inject(Store);

  ngOnInit(): void {
    this.dataSource = dataSource;
    this.basic_columns = basic_columns;
    this.editable_columns = editable_columns;
    this.basic_select_items = basic_select_items;

    this.store.dispatch(fromLoginAction.init());
  }
}

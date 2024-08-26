import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicTableComponent} from "@shared/components/basic-table/basic-table.component";
import {basic_data as dataSource, basic_columns, editable_columns, basic_data} from '../../config/config-table'
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import {EditableTableComponent} from "@shared/components/editable-table/editable-table.component";

@Component({
  selector: 'app-basic-example',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DynamicTableComponent,
    EditableTableComponent,
    TuiRoot,
    TuiDialog,
    TuiAlert
  ],
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss']
})
export class BasicExampleComponent implements OnInit {

  public dataSource: any[] = [];
  public basic_columns: any[] = [];
  public editable_columns: any[] = [];
  private store: Store<fromAuth.State> = inject(Store);

  ngOnInit(): void {
    this.dataSource = dataSource;
    this.basic_columns = basic_columns;
    this.editable_columns = editable_columns;
    this.store.dispatch(fromLoginAction.init());
  }
}

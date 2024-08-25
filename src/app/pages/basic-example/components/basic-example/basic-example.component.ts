import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicTableComponent} from "@shared/components/dynamic-table/dynamic-table.component";
import { data as dataSource, columns} from '../../config/config-table'
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";

@Component({
  selector: 'app-basic-example',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DynamicTableComponent,
    TuiRoot,
    TuiDialog,
    TuiAlert
  ],
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss']
})
export class BasicExampleComponent implements OnInit {

  public dataSource: any[] = [];
  public columns: any[] = [];
  private store: Store<fromAuth.State> = inject(Store);

  ngOnInit(): void {
    this.dataSource = dataSource;
    this.columns = columns;
    this.store.dispatch(fromLoginAction.init());
  }
}

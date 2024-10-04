import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  basic_columns,
  editable_columns,
  title_columns,
  units} from '../../config/config-table'
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import * as basicExampleAction from "@pages/basic-example/store/basic-example.actions";
import * as basicExampleSelector from "@pages/basic-example/store/basic-example.selectors";

import {select, Store} from "@ngrx/store";
import {DynamicTableComponent} from "@shared/components/tables/basic-table/basic-table.component";
import {EditableTableComponent} from "@shared/components/tables/editable-table/editable-table.component";
import {SelectComponent} from "@shared/components/controls/select/select.component";
import {Observable} from "rxjs";
import {BasicDataInterface} from "@core/models/backend/basick-examples/tables.interface";
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";
import {TuiDay} from "@taiga-ui/cdk";
import {TabulatorTableComponent} from "@shared/components/tables/tabulator-table/tabulator-table.component";

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
        TuiAlert,
        TabulatorTableComponent
    ],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {

  public editable_python_data: any[] = [];
  public editable_python_starwars: any[] = [];

  public loading$: Observable<boolean | null> | undefined;
  public basicTableData$: Observable<BasicDataInterface[] | null> | undefined;
  private store: Store = inject(Store);

  ngOnInit(): void {


    this.editable_python_data = [
      {
        name: 'Holy Grail',
        price: 999999,
        quantity: 1,
        unit: 'items',
        date: TuiDay.currentLocal(),
      },
      {
        name: 'Foot',
        price: 29.95,
        quantity: 5,
        unit: 'kg',
        date: TuiDay.currentLocal().append({day: -42}),
      },
      {
        name: 'Shed',
        price: 499,
        quantity: 2,
        unit: 'm',
        date: TuiDay.currentLocal().append({day: -237}),
      },
    ];

    this.editable_python_starwars = [
      {
        name: 'Lightsaber',
        price: 4999,
        quantity: 3,
        unit: 'itms',
        date: TuiDay.currentLocal(),
      },
      {
        name: 'Spaceship',
        price: 19999,
        quantity: 1,
        unit: 'm',
        date: TuiDay.currentLocal().append({day: -237}),
      },
      {
        name: 'Stormtrooper helmet',
        price: 14.95,
        quantity: 5,
        unit: 'kg',
        date: TuiDay.currentLocal().append({day: -42}),
      },
    ];

    this.loading$ = this.store.pipe(select(fromLoginSelectors.getLoading));
    this.store.dispatch(basicExampleAction.tablesInit());
    this.basicTableData$ = this.store.pipe(select(basicExampleSelector.getTableData));
  }

  protected readonly units = units;
  protected readonly editable_columns = editable_columns;
  protected readonly basic_columns = basic_columns;
  protected readonly title_columns = title_columns;

}

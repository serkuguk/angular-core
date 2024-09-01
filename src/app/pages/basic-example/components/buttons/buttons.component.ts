import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {basic_data as dataSource,
  basic_columns,
  editable_columns,
  basic_select_items} from '../../config/config-table'
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {select, Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import {DynamicTableComponent} from "@shared/components/tables/basic-table/basic-table.component";
import {EditableTableComponent} from "@shared/components/tables/editable-table/editable-table.component";
import {SelectComponent} from "@shared/components/controls/select/select.component";
import {ButtonComponent} from "@shared/components/buttons";
import {LoaderComponent} from "@shared/components/loader/loader.component";
import {TranslateModule} from "@ngx-translate/core";
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-buttons',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    ButtonComponent,
    LoaderComponent,
    TranslateModule
  ],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  ngOnInit(): void {

  }
}

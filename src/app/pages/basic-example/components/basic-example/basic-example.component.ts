import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";
import {DynamicTableComponent} from "@shared/components/dynamic-table/dynamic-table.component";
import { data as dataSource} from '../../config/config-table'

import {DynamicTableModule} from "@shared/components/dynamic-table";
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";

@Component({
  selector: 'app-basic-example',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule
    DynamicTableModule,
    TuiRoot,
    TuiDialog,
    TuiAlert
  ],
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss']
})
export class BasicExampleComponent implements OnInit {

  public dataSource: any[] = [];

  ngOnInit(): void {
    console.log(dataSource)
    this.dataSource = dataSource;
  }
}

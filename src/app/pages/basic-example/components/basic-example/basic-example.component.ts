import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicTableComponent} from "@shared/components/dynamic-table/dynamic-table.component";
import { data as dataSource, columns} from '../../config/config-table'
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";

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

  ngOnInit(): void {
    this.dataSource = dataSource;
    this.columns = columns;
  }
}

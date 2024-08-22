import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicTableModule} from "@shared/components/dynamic-table";
import { TuiRoot, TuiAlert, TuiDialog } from "@taiga-ui/core";

@Component({
  selector: 'app-basic-example',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DynamicTableModule,
    TuiRoot,
    TuiDialog,
    TuiAlert
  ],
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss']
})
export class BasicExampleComponent {

}

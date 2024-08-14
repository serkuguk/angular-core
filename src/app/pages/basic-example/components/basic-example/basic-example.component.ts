import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DynamicTableModule} from "@shared/components/dynamic-table";
import {TuiAlertModule, TuiDialogModule, TuiRootModule} from "@taiga-ui/core";

@Component({
  selector: 'app-basic-example',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    DynamicTableModule,
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule
  ],
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss']
})
export class BasicExampleComponent {

}

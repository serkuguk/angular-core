import {Component, input} from '@angular/core';
import {TuiPoint} from "@taiga-ui/core";
import {CommonModule} from "@angular/common";
import {TuiAxes, TuiBarChart, TuiLineChart} from "@taiga-ui/addon-charts";

@Component({
  selector: 'bar-charts',
  standalone: true,
  imports: [CommonModule, TuiAxes, TuiLineChart, TuiBarChart],
  templateUrl: './bar-charts.component.html',
  styleUrl: './bar-charts.component.scss'
})
export class BarChartsComponent {

  public charts = input<TuiPoint[]>();
  public dots = input<boolean>(true);
  public filled = input<boolean>(false);
  public height = input<number>(200);
  public width = input<number>(400);
  public smoothingFactor = input<number>(50);
  public xStringify = input<any>(String);
  public yStringify = input<any>(String);
  public labelsX = input<any[]>([]);
  public labelsY = input<any[]>([]);
  public max = input<number>(10000);
}

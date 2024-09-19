import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TuiAxes, TuiLineChart, TuiLineChartHint} from "@taiga-ui/addon-charts";
import {TuiPoint} from "@taiga-ui/core";
import {TuiContext} from "@taiga-ui/cdk";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'line-charts',
  standalone: true,
  imports: [
      CommonModule,
      TuiAxes,
      TuiLineChart,
      TuiLineChartHint
  ],
  templateUrl: './line-charts.component.html',
  styleUrl: './line-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartsComponent {

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

  readonly hintContent = ({
    $implicit,
  }: TuiContext<readonly TuiPoint[]>): number => $implicit[0]?.[1] ?? 0;

}

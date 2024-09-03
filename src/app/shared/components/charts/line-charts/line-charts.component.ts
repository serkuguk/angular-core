import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiAxes, TuiLineChart, TuiLineChartHint} from "@taiga-ui/addon-charts";
import {TuiPoint} from "@taiga-ui/core";
import {TuiContext} from "@taiga-ui/cdk";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'line-charts',
  standalone: true,
  imports: [CommonModule, TuiAxes, TuiLineChart, TuiLineChartHint],
  templateUrl: './line-charts.component.html',
  styleUrl: './line-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartsComponent {
  protected readonly value: readonly TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

  readonly stringify = String;

  readonly hintContent = ({
                                      $implicit,
                                    }: TuiContext<readonly TuiPoint[]>): number => $implicit[0]?.[1] ?? 0;
}

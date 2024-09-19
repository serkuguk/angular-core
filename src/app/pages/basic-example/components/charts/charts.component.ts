import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LineChartsComponent} from "@shared/components/charts/line-charts/line-charts.component";
import {TuiPoint} from "@taiga-ui/core";
import {BarChartsComponent} from "@shared/components/charts/bar-charts/bar-charts.component";
import {LineDaysChartComponent} from "@shared/components/charts/line-days-chart/line-days-chart.component";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [LineChartsComponent, BarChartsComponent, LineDaysChartComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent {

  protected readonly lineCharts: readonly TuiPoint[] = [
    [50, 50],
    [100, 75],
    [150, 50],
    [200, 150],
    [250, 155],
    [300, 190],
    [350, 90],
  ];

  protected readonly barChart = [
    [3660, 8281, 1069, 9034, 5797, 6918, 8495, 3234, 6204, 1392, 2088, 8637, 8779],
    [3952, 3671, 3781, 5323, 3537, 4107, 2962, 3320, 8632, 4755, 9130, 1195, 3574],
  ];

  protected readonly labelsX = ['Jan 2021', 'Feb', 'Mar', ''];
  protected readonly labelsY = ['0', '10 000'];

}

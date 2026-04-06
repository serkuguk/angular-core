import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ChartsComponent} from '@shared/components/charts/charts.component';
import {ChartData} from './interface/chart-data.interface';

@Component({
  selector: 'charts-example',
  templateUrl: './charts-example.component.html',
  styleUrl: './charts-example.component.scss',
  imports: [
    ChartsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsExampleComponent {
  protected readonly chartData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Sales',
        data: [540, 325, 702, 620],
        backgroundColor: [
          'rgba(249, 115, 22, 0.2)',
          'rgba(6, 182, 212, 0.2)',
          'rgba(107, 114, 128, 0.2)',
          'rgba(139, 92, 246, 0.2)'
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(6, 182, 212)',
          'rgb(107, 114, 128)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 1
      }
    ]
  };

  protected readonly chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    }
  };
}

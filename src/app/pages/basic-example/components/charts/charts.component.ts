import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LineChartsComponent} from "@shared/components/charts/line-charts/line-charts.component";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [LineChartsComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent {

}

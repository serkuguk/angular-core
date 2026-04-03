import {ChangeDetectionStrategy, Component, computed, effect, signal} from '@angular/core';

@Component({
    selector: 'app-charts',
    imports: [],
    templateUrl: './charts.component.html',
    styleUrl: './charts.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent {

  protected numberOfClicked = signal<number>(0);

  constructor() {
    effect(() => {
      console.log('Clicks changed:', this.numberOfClicked());
    });
  }

  protected readonly clickLabel = computed(() => `How many clicks: ${this.numberOfClicked()}`)
  protected readonly isPopular = computed(() => this.numberOfClicked() >= 10)

  protected readonly barChart = [
    [3660, 8281, 1069, 9034, 5797, 6918, 8495, 3234, 6204, 1392, 2088, 8637, 8779],
    [3952, 3671, 3781, 5323, 3537, 4107, 2962, 3320, 8632, 4755, 9130, 1195, 3574],
  ];

  protected readonly labelsX = ['Jan 2021', 'Feb', 'Mar', ''];
  protected readonly labelsY = ['0', '10 000'];

  protected incrementClicks() {
    this.numberOfClicked.update((prev) => prev + 1);
  }

  protected resetClicks() {
    this.numberOfClicked.set(0)
  }
}

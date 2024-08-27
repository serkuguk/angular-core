import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiLoader, tuiLoaderOptionsProvider} from "@taiga-ui/core";
import {PolymorpheusOutlet} from "@taiga-ui/polymorpheus";

@Component({
  selector: 'app-loader',
  standalone: true,
  exportAs: 'loader',
  imports: [TuiLoader, PolymorpheusOutlet],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @Input() overlay: boolean = false;
  @Input() showLoader!: boolean;
  @Input() size!: unknown;
  @Input() loaderClass?: string;
  @Input() inheritColor: boolean = false;
  @Input() textContent: string | null = null;
}

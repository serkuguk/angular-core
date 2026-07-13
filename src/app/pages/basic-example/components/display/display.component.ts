import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AvatarComponent} from "@springest/ui";

@Component({
  selector: 'app-display',
  imports: [
    AvatarComponent
  ],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent {
}

import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ButtonModule} from "primeng/button";

export type ButtonType = 'button' | 'submit';
export type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  type = input<ButtonType>('button');
  class = input<string>();
  style = input<any>();
  label = input<string>();
  iconPos = input<ButtonIconPosition>();
  styleClass = input<string>();
  icon = input<string>();
  disabled = input<boolean>();

  constructor() {}
}

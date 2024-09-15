import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TuiAppearance, TuiAutoColorPipe, TuiDropdownOptionsDirective, TuiHint} from "@taiga-ui/core";

@Component({
  selector: 'tool-tip',
  standalone: true,
  imports: [TuiAutoColorPipe, TuiHint, TuiAppearance, TuiDropdownOptionsDirective],
  templateUrl: './tool-tip.component.html',
  styleUrl: './tool-tip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolTipComponent {

  public before = input<string>('before');
  public text = input<string>('');
}

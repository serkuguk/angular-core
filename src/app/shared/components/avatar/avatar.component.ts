import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {TuiAutoColorPipe, TuiFallbackSrcPipe, TuiIconPipe, TuiTitle} from "@taiga-ui/core";
import {AsyncPipe, CommonModule} from "@angular/common";
import {TuiAvatar, TuiFade} from "@taiga-ui/kit";

type SizeType = "m" | "s" | "xs" | "l" | "xl" | "xxl";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    CommonModule,
    TuiAvatar,
    TuiFallbackSrcPipe,
    AsyncPipe,
    TuiIconPipe,
    TuiTitle,
    TuiAutoColorPipe,
    TuiFade],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  public size = input<SizeType>('s');
  public appearance = input<any>();
  public icon = input<string>();
  public class = input<string>();
  public customStyle = input<string>();
}

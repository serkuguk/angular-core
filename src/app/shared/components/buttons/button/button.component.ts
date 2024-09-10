import {Component, input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TuiButton} from "@taiga-ui/core";

export type ButtonType = 'button' | 'submit';
export type SizeType = "m" | "l" | "xl" | "s" | "xs";

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [
      CommonModule,
      TuiButton
    ],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    public size = input<SizeType>('l');
    public type = input<ButtonType>('button');
    public disabled = input<boolean>(false);
    public iconStart = input<string>();
    public iconEnd = input<string>();
}

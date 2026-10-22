import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";

import {CheckboxComponent} from "springest";


@Component({
    selector: 'show-button',
    providers: [],
  imports: [
    CommonModule,
    CheckboxComponent
  ],
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent{
    esMenorEdad: boolean = false;

    onCheckboxChanged(value: boolean): void {
        console.log('Checkbox value changed:', value);
        console.log('Es menor de edad:', this.esMenorEdad);
    }
}

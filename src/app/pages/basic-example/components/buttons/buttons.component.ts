import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormField, form} from "@angular/forms/signals";

/*import {ButtonComponent} from "@shared/components/button";
import {LoaderComponent} from "@shared/components/loader/loader.component";*/
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "@shared/components/button/button.component";
import {CheckboxComponent} from "@shared/components/controls";


@Component({
    selector: 'show-button',
    providers: [],
  imports: [
    CommonModule,
    /*ButtonComponent,
    LoaderComponent,*/
    TranslateModule,
    ButtonComponent,
    CheckboxComponent,
    FormField
  ],
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent{
    public readonly formModel = signal({
        esMenorEdad: false
    });
    public readonly checkboxForm = form(this.formModel);

    onCheckboxChanged(value: boolean): void {
        console.log('Checkbox value changed:', value);
        console.log('Es menor de edad:', this.formModel().esMenorEdad);
    }
}

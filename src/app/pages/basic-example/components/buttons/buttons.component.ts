import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
    FormsModule,
    /*ButtonComponent,
    LoaderComponent,*/
    TranslateModule,
    ButtonComponent,
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

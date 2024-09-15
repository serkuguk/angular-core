import {ChangeDetectionStrategy, Component, forwardRef, input, output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgForOf} from "@angular/common";
import {TuiPlatform} from "@taiga-ui/cdk";
import {TuiRadio} from "@taiga-ui/kit";

@Component({
    selector: 'default-radio',
    standalone: true,
    templateUrl: './default-radios.component.html',
    styleUrls: ['./default-radios.component.scss'],
    imports: [
      NgForOf,
      FormsModule,
      ReactiveFormsModule,
      TuiPlatform,
      TuiRadio
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DefaultRadioComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultRadioComponent implements ControlValueAccessor {

    public items = input.required<any[]>();
    public changed = output<any[]>();

    value: any;
    isDisabled?: boolean;

    private propagateChange: any = () => { };

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(value: any): void {
        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    isChecked(value: any): boolean {
        return this.value === value;
    }

}

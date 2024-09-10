import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  input, output
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TuiIcon, TuiSizeL, TuiSizeS, TuiTextfield} from "@taiga-ui/core";
import {TuiCopy, TuiPassword} from '@taiga-ui/kit';

@Component({
    selector: 'app-input-password',
    standalone: true,
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    imports: [
      CommonModule,
      FormsModule,
      TuiCopy,
      TuiIcon,
      TuiPassword,
      TuiTextfield
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPasswordComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent implements ControlValueAccessor {
  public placeholder = input<string>();
  public label = input<boolean>(false);
  public labelText = input<string>('Label Text');
  public textfieldSize = input<TuiSizeL | TuiSizeS>('l');
  public changed = output<string>();

    control = new FormControl();

    value: string | undefined;

    private propagateChange: any = () => { };
    private propagateTouched: any = () => { };


    writeValue(value: string): void {
        this.control.setValue(value);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
        this.control.valueChanges.subscribe(this.propagateChange);
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.control.disable() : this.control.enable();
    }

    onKeyup(value: string): void {
        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    onBlur(): void {
        this.propagateTouched();
    }
}

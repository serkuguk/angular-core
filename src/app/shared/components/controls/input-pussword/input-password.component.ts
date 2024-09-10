import {
  Component,
  forwardRef,
  ChangeDetectionStrategy,
  input, output
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TuiSizeL, TuiSizeS, TuiTextfield} from "@taiga-ui/core";
import {TUI_PASSWORD_TEXTS, TuiInputPassword, tuiInputPasswordOptionsProvider} from "@taiga-ui/kit";
import {of} from "rxjs";

@Component({
    selector: 'app-input-password',
    standalone: true,
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    imports: [
      CommonModule,
      FormsModule,
      TuiInputPassword,
      TuiTextfield
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPasswordComponent),
            multi: true
        },
        tuiInputPasswordOptionsProvider({
                                          icons: {
                                            hide: '@tui.eye-off',
                                            show: '@tui.eye'
                                          },
                                        }),
        {
          provide: TUI_PASSWORD_TEXTS,
          useValue: of(['', '']),
        },

    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordComponent implements ControlValueAccessor {
  public placeholder = input<string>();
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

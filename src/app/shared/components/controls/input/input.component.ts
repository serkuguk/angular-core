import {
  Component,
  OnInit,
  forwardRef,
  ChangeDetectionStrategy,
  output, input
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TuiInputModule} from "@taiga-ui/legacy";
import {TuiSizeL, TuiSizeS, TuiTextfieldOptionsDirective} from "@taiga-ui/core";

@Component({
    selector: 'app-input',
    standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiTextfieldOptionsDirective
  ],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, ControlValueAccessor {
     public placeholder = input<string>();
     public textfieldSize = input<TuiSizeL | TuiSizeS>('m');
     public changed = output<string>();

    control = new FormControl();
    value: string | undefined;

    ngOnInit(): void {
    }

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

import {
  Component,
  forwardRef,
  input,
  output,
  ChangeDetectionStrategy
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule} from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import {AsyncPipe, CommonModule} from "@angular/common";
import {TuiError} from "@taiga-ui/core";
import {TuiInputDateModule, TuiTextfieldControllerModule, TuiUnfinishedValidator} from "@taiga-ui/legacy";
import {TuiFieldErrorPipe} from "@taiga-ui/kit";

@Component({
    selector: 'app-date',
    standalone: true,
    imports: [
      CommonModule,
      AsyncPipe,
      ReactiveFormsModule,
      TuiError,
      TuiFieldErrorPipe,
      TuiInputDateModule,
      TuiTextfieldControllerModule,
      TuiUnfinishedValidator
    ],
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent implements ControlValueAccessor {

    public placeholder = input<string>();
    public min = input<Date>();
    public max = input<Date>();

    public changed = output<TuiDay | null>();
    public closed = output<void>();

    value: TuiDay | null = null;
    isDisabled?: boolean;

    private propagateChange: any = () => { };
    private propagateTouched: any = () => { };

    writeValue(day: TuiDay): void {
        this.value = day;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(day: TuiDay): void {
        const value = day ? day : null;

        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    onClosed(): void {
        this.propagateTouched();
        this.closed.emit();
    }

}

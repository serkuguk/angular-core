import {
  Component,
  forwardRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  input,
  output,
  ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import {CommonModule} from "@angular/common";
import {TuiCalendar} from "@taiga-ui/core";

@Component({
    selector: 'app-date',
    standalone: true,
    imports: [
      CommonModule,
      TuiCalendar
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

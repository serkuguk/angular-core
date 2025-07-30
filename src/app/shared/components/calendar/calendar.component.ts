import {Component, forwardRef, input, output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DatePickerModule} from 'primeng/datepicker';
import {FloatLabelModule} from 'primeng/floatlabel';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    standalone: true,
    imports: [DatePickerModule, FloatLabelModule, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CalendarComponent),
            multi: true
        }
    ]
})
export class CalendarComponent implements ControlValueAccessor {

    placeholder = input<string>();
    maxDate = input<Date>();
    minDate = input<Date>();
    changed = output<Date>();
    closed = output<void>();

    value: Date | undefined;
    isDisabled = false;

    propagateChange: any = () => {
    };
    propagateTouched: any = () => {
    };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: Date | null): void {
        this.value = value ?? undefined;
    }

    onChanged(event: Date): void {
        this.value = event;
        this.propagateChange(event);
        this.changed.emit(event);
    }

    onClosed(): void {
        this.propagateTouched();
        this.closed.emit();
    }
}

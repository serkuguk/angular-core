import { Component, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateComponent),
            multi: true
        }
    ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

    @Input() placeholder?: string;
    @Input() min?: Date;
    @Input() max?: Date;

    @Output() changed = new EventEmitter<TuiDay | null>();
    @Output() closed = new EventEmitter<void>();

    value: TuiDay | null = null;
    isDisabled?: boolean;

    constructor() { }

    ngOnInit(): void {
    }

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

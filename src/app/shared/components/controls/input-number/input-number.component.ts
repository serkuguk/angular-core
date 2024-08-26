import { Component, OnInit, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TuiInputNumberModule} from "@taiga-ui/legacy";
import {TuiNumberFormat} from "@taiga-ui/core";

@Component({
    selector: 'app-input-number',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      TuiInputNumberModule,
      TuiNumberFormat
    ],
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder?: string;
    @Input() textfieldSize?: string = 'm';
    @Input() formControlName?: string;
    @Output() changed = new EventEmitter<string>();

    value: string | undefined;
    isDisabled: boolean | undefined;

    constructor() { }

    ngOnInit(): void {
    }

    private propagateChange: any = () => { };
    private propagateTouched: any = () => { };

    writeValue(value: string): void {
        this.value = value;
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

    onKeyup(value: string): void {
        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    onBlur(): void {
        this.propagateTouched();
    }
}

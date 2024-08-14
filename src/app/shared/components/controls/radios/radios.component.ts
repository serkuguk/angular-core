import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

// import { ControlItem, Value } from '@app/models/frontend';
// export { ControlItem, Value } from '@app/models/frontend';

@Component({
    selector: 'app-radios',
    standalone: true,
    templateUrl: './radios.component.html',
    styleUrls: ['./radios.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadiosComponent),
            multi: true
        }
    ]
})
export class RadiosComponent implements OnInit, ControlValueAccessor {

    @Input() items: any;

    @Output() changed = new EventEmitter<any>();

    value: any;
    isDisabled?: boolean;

    constructor() { }

    ngOnInit(): void {
    }

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

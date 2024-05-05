import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/*import { ControlItem, Value } from '@app/models/frontend';
export { ControlItem, Value } from '@app/models/frontend';*/

@Component({
    selector: 'app-checkboxes',
    templateUrl: './checkboxes.component.html',
    styleUrls: ['./checkboxes.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxesComponent),
            multi: true
        }
    ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
    @Input() items!: any[];
    @Output() changed = new EventEmitter<any[]>();

    value: any[] = [];
    isDisabled?: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    private propagateChange: any = () => { };

    writeValue(value: any[]): void {
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

    onChanged(value: any, checked: boolean): void {
        const selected = this.getSelected(value, checked);

        this.value = selected;
        this.propagateChange(selected);
        this.changed.emit(selected);
    }

    private getSelected(value: any, checked: boolean): any[] {
        const selected: any[] = this.value ? [...this.value] : [];

        if (checked) {
            if (!selected.includes(value)) {
                selected.push(value);
            }
        } else {
            const index = selected.indexOf(value);
            selected.splice(index, 1);
        }

        return selected.length ? selected : null;
    }

    isChecked(value: any): boolean {
        return this.value && this.value.includes(value);
    }

}

import {Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged, startWith, map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-autocomplete',
    standalone: true,
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutocompleteComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {

    @Input() items!: any[];
    @Input() placeholder?: string;

    @Output() changed = new EventEmitter<any>();

    formControl = new FormControl();
    options$: Observable<any[]> | undefined;
    private destroy = new Subject<any>();

    ngOnInit(): void {
        this.options$ = this.formControl.valueChanges.pipe(
            startWith(''),
            filter(value => typeof value === 'string' || typeof value === 'object'),
            map(value => typeof value === 'string' ? value : value.label),
            map(label => label ? this.filter(label) : this.items.slice())
        );

        this.formControl.valueChanges.pipe(
            takeUntil(this.destroy),
            distinctUntilChanged()
        ).subscribe(item => {
            const value = typeof item === 'object' ? item.value : null;
            this.propagateChange(value);
            this.changed.emit(value);
        });
    }

    private filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.items.filter(item => item.label.toLowerCase().includes(filterValue));
    }

    private propagateChange: any = () => { };
    private propagateTouched: any = () => { };

    writeValue(value: any): void {
        const selectedOption = this.items.find(item => item.value === value);
        this.formControl.setValue(selectedOption);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }
    }

    displayFn(item?: any): string | undefined {
        return item ? item.label : undefined;
    }

    onBlur(): void {
        this.propagateTouched();
    }

}

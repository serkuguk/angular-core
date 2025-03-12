import {ChangeDetectionStrategy, Component, forwardRef, input, OnInit, output} from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FloatLabel} from "primeng/floatlabel";

@Component({
    selector: 'app-basic-input',
    standalone: true,
    imports: [InputTextModule, FloatLabel],
    templateUrl: './basic-input.component.html',
    styleUrl: './basic-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BasicInputComponent),
            multi: true
        }
    ],
})
export class BasicInputComponent implements OnInit, ControlValueAccessor {
    public placeholder = input<string>("Input some text...");
    public labelType = input<string>("in_label");
    public changed = output<string>();

    value: string = "";
    isDisabled: boolean = false;

    ngOnInit(): void {
    }

    private propagateChange: any = () => {
    };
    private propagateTouched: any = () => {
    };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    writeValue(value: string): void {
        this.value = value;
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

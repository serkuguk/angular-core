import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  input,
  output,
  ChangeDetectionStrategy
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from "@angular/common";
import {TuiCheckbox} from "@taiga-ui/kit";
import {TuiPlatform} from "@taiga-ui/cdk";

@Component({
    selector: 'app-checkboxes',
    standalone: true,
    imports: [
        CommonModule,
        NgForOf,
        FormsModule,
        ReactiveFormsModule,
        TuiCheckbox,
        TuiPlatform
    ],
    templateUrl: './checkboxes.component.html',
    styleUrls: ['./checkboxes.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxesComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesComponent implements ControlValueAccessor {

    public items = input.required<any[]>();
    public changed = output<any[]>();

    value: any[] = [];
    isDisabled?: boolean;

    private propagateChange: any = () => { };

    writeValue(value: any[]): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
      // TODO document why this method 'registerOnTouched' is empty
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
        const selected: any = this.value || this.value === 0 ? [...this.value] : [];

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

    getSize(first: any) {
        return undefined;
    }
}

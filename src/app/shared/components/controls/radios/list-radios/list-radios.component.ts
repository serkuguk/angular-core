import {ChangeDetectionStrategy, Component, forwardRef, input, output} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiRadioList} from "@taiga-ui/kit";
import {TuiTitle} from "@taiga-ui/core";
import {TuiBooleanHandler} from "@taiga-ui/cdk";

@Component({
    selector: 'list-radios',
    standalone: true,
    templateUrl: './list-radios.component.html',
    styleUrls: ['./list-radios.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, TuiRadioList, TuiTitle],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ListRadiosComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListRadiosComponent implements ControlValueAccessor {

    public readonly objects = [
      {
        name: 'King Arthur',
        description: 'Graham Chapman',
      },
      {
        name: "It's Man",
        description: 'Michael Palin',
      },
      {
        name: 'Silly Walks',
        description: 'John Cleese',
      },
    ];

    protected readonly strings = ['King Arthur', "It's Man", 'Silly Walks'];

    protected horizontal = this.strings[0]!;

    protected readonly handler: TuiBooleanHandler<string> = (item) => item === this.strings[2]!;

    public items = input.required<any[]>();
    public changed = output<any[]>();

    value: any;
    isDisabled?: boolean;

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

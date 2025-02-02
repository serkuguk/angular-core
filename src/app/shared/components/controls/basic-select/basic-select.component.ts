import {ChangeDetectionStrategy, Component, forwardRef, input, OnInit, output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Select} from "primeng/select";
import {FloatLabel} from "primeng/floatlabel";

@Component({
  selector: 'app-basic-select',
  standalone: true,
  imports: [
    Select,
    FormsModule,
    FloatLabel
  ],
  templateUrl: './basic-select.component.html',
  styleUrl: './basic-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicSelectComponent),
      multi: true
    }
  ]
})
export class BasicSelectComponent  implements OnInit, ControlValueAccessor {
  public items = input<any[]>();
  public class = input<string>();
  public disabledValue = input<any[]>([]);
  public placeholder = input<string>("Select sum items...");
  public lengthTextSelected = input<number>(20);
  public filter = input<boolean>(false);
  public emptyOption = input<boolean>(false);
  public showClear = input<boolean>(Boolean(false));
  public withIcons = input<boolean>(false);
  public resetFilterOnHide = input<boolean>(true);
  public nullOrZero = input<number | null>(null);
  public labelType = input<string>("in_label");
  public showIcon = input<boolean>(false);
  public changed = output<number | string>();

  value: string | undefined;
  isDisabled: boolean | undefined;

  ngOnInit(): void {}

  private propagateChange: any = () => {}
  private propagateTouched: any = () => {}

  disableItem(value: any): boolean {
    if (this.disabledValue()) {
      if (!this.disabledValue().length) {
        //this.disabledValue = [this.disabledValue];
      }
      return this.disabledValue().includes(value);
    }
    return false;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  writeValue(value: any): void {
    this.value = value;
    this.showClear = (value && this.emptyOption);
  }

  onBlur(): void {
    this.propagateTouched()
  }

  onChanged(event: any): void {
    const value = event.value || event.value === 0 ? event.value : this.nullOrZero;
    this.showClear = (value && this.emptyOption);
    this.propagateChange(value);
    this.changed.emit(value);
  }
}

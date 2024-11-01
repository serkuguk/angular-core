import {ChangeDetectionStrategy, Component, forwardRef, input, OnInit, output} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-basic-input',
  standalone: true,
  imports: [InputTextModule],
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
  public placeholder = input<string>();
  public changed = output<string>();

  control = new FormControl();
  value: string | undefined;

  ngOnInit(): void {
  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  writeValue(value: string): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    this.control.valueChanges.subscribe(this.propagateChange);
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
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

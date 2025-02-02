import {Component, forwardRef, Input, Output, EventEmitter, OnInit, input, output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [DatePickerModule, FloatLabelModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]
})
export class CalendarComponent implements OnInit, ControlValueAccessor {

  public placeholder = input<string>();
  public maxDate = input<Date>();
  public minDate = input<Date>();
  public changed = output<any>();
  public closed = output<void>();

  value: Date | undefined;
  isDisabled: boolean = false;

  ngOnInit(): void {}

  propagateChange: any = () => {};
  propagateTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: Date): void {
    this.value = value;
  }

  onChanged(event: any): void {
    this.propagateChange(event);
    this.changed.emit(event);
  }

  onInput(value: string): void {
    this.onChanged(value);
  }

  onClosed(): void {
    this.propagateTouched();
    this.closed.emit();
  }
}

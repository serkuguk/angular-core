import {JsonPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FormField, form} from '@angular/forms/signals';
import {CalendarComponent as SharedCalendarComponent} from '@shared/components/calendar';
import {ButtonComponent} from "@shared/components/button/button.component";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";

@Component({
  selector: 'app-calendar-example',
  imports: [SharedCalendarComponent, FormField, JsonPipe, FormFieldComponent, ButtonComponent],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarExampleComponent {
  public minDate = new Date(2020, 0, 1);
  public maxDate = new Date(2030, 11, 31);

  public formModel = signal<{ createdAt: Date | null }>({
    createdAt: null
  });

  public myForm = form(this.formModel);

  onDateChanged(date: Date | null): void {
    console.log('Calendar changed:', date);
  }

  onClosed(): void {
    console.log('Calendar closed');
  }

  reset(): void {
    this.myForm.createdAt().value.set(null);
  }

  submit(): void {
    console.log('Form value:', this.formModel());
  }

}

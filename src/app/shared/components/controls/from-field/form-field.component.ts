import {ChangeDetectionStrategy, Component, forwardRef, input, OnInit} from '@angular/core';
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-form-field',
  imports: [
    TranslateModule
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
})
export class FormFieldComponent {
  public label = input<string>();
  public required = input<boolean>();
  public isInline = input<boolean>(true);
  public showLabel = input<boolean>();
  public control = input<AbstractControl>();
  public patternError = input<string>();

  hasError(): boolean {
    const control = this.control();
    return !!control && control.invalid && control.touched;
  }

  get errorKey() {
    const control = this.control();
    return (control && control?.errors && Object.keys(control.errors)[0]) ? Object.keys(control.errors)[0] : null;
  }
}

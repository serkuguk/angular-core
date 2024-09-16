import {Component, OnInit, Input, input, ChangeDetectionStrategy, ChangeDetectorRef, inject} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-form-field',
    standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss']
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

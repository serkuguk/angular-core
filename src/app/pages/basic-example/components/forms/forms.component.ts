import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import {toSignal} from "@angular/core/rxjs-interop";
import {TranslateModule} from "@ngx-translate/core";
import {NameValidator} from "@pages/basic-example/components/forms/validators/name.validator";
import {validateDateRange} from "@pages/basic-example/components/forms/validators/range.validator";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {BasicInputComponent} from "@shared/components/controls/basic-input/basic-input.component";
import {BasicSelectComponent} from "@shared/components/controls/basic-select/basic-select.component";
import {CheckboxComponent} from "@shared/components/controls/checkbox/checkbox.component";
import {PasswordInputComponent} from "@shared/components/controls/password-input/password-input.component";
import {ButtonComponent} from "@shared/components/button/button.component";

@Component({
  selector: 'app-forms',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormFieldComponent,
    BasicInputComponent,
    BasicSelectComponent,
    CheckboxComponent,
    PasswordInputComponent,
    ButtonComponent
  ],
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent {
  public readonly isInline: boolean = true;
  readonly type = signal<any[]>(['PERSON', 'LEGAL']);
  readonly nameValue = signal<string | null>(null);
  readonly marketingConsent = signal<boolean>(true);

  nameValidator = inject(NameValidator);
  fb = inject(FormBuilder);

  form = this.fb.group({
    type: this.fb.control<string>(''),
    name:  this.fb.control<string>(''),
    inn: this.fb.control<string>(''),
    lastName: this.fb.control<string>(''),
    password: this.fb.control<string>(''),
    addresses: this.fb.control<string>(''),
    feature: this.fb.control<string>(''),
    dateRange: this.fb.group({
      from: this.fb.control<string>(''),
      to: this.fb.control<string>(''),
    }, { validators: validateDateRange({fromControlName: 'from', toControlName: 'to'}) })
  });

  readonly lastNameInput = toSignal(
    this.form.controls.lastName.valueChanges,
    {initialValue: this.form.controls.lastName.value ?? ''}
  );
  readonly nameCount = computed(() => (this.lastNameInput() ?? '').length);

  nameFromInput = computed(() => this.nameValue() + '_' + this.nameCount());

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
  }

  addAddress() {
    this.nameValue.set(this.lastNameInput() ?? '');
  }

  updateMarketingConsent(value: boolean): void {
    this.marketingConsent.set(value);
  }

}

import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {NameValidator} from "@pages/basic-example/components/forms/validators/name.validator";
import {getAddressForm} from "@pages/basic-example/components/forms/validators/addres.validator";
import {validateDateRange} from "@pages/basic-example/components/forms/validators/range.validator";
import {DynamicTableComponent} from "@shared/components/tables/basic-table/basic-table.component";
import {EditableTableComponent} from "@shared/components/tables/editable-table/editable-table.component";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {InputComponent} from "@shared/components/controls/input/input.component";
import {DateComponent} from "@shared/components/controls/date/date.component";
import {KeyValuePipe} from "@angular/common";
import {SelectComponent} from "@shared/components/controls/select/select.component";
import {ButtonComponent} from "@shared/components/buttons";

export enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    DynamicTableComponent,
    EditableTableComponent,
    FormFieldComponent,
    InputComponent,
    DateComponent,
    KeyValuePipe,
    SelectComponent,
    ButtonComponent
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent {

  public readonly isInline: boolean = true;
  public readonly type = signal<any[]>(['PERSON', 'LEGAL']);
  nameValidator = inject(NameValidator);

  /*constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addrs => {
        // while(this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0)
        // }

        this.form.controls.addresses.clear();

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAddressForm(addr));
        }

        // this.form.controls.addresses.setControl(1, getAddressForm())
        // console.log(this.form.controls.addresses.at(0))
      });

    this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(val => {
        this.form.controls.inn.clearValidators();

        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators(
            [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
          );
        }
      });
  }*/

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)],
      updateOn: 'blur'
    }),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>('VALUE'),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup({
      from: new FormControl<string>(''),
      to: new FormControl<string>(''),
    }, validateDateRange({fromControlName: 'from', toControlName: 'to'}))
  });

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
  }

  addAddress() {
    this.form.controls.addresses.insert(0, getAddressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}

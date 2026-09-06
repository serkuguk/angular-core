import {ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {BasicInputComponent, BasicSelectComponent, ButtonComponent, FormFieldComponent} from "@springest/ui";
import {FormField, form, submit} from "@angular/forms/signals";

@Component({
  selector: 'app-forms',
  imports: [
    TranslateModule,
    FormFieldComponent,
    BasicInputComponent,
    BasicSelectComponent,
    ButtonComponent,
    FormField
  ],
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsComponent {
  public readonly isInline: boolean = true;
  readonly type = signal([
    {name: 'Person', value: 'PERSON'},
    {name: 'Legal', value: 'LEGAL'}
  ]);
  readonly nameValue = signal<string | null>(null);

  readonly model = signal({type: '', name: '', inn: '', lastName: ''});
  readonly form = form(this.model);

  readonly lastNameInput = computed(() => this.model().lastName ?? '');
  readonly nameCount = computed(() => this.lastNameInput().length);

  nameFromInput = computed(() => this.nameValue() + '_' + this.nameCount());

  onSubmit(event: Event): void {
    event.preventDefault();
    submit(this.form, async () => {});
  }

  addAddress(): void {
    this.nameValue.set(this.lastNameInput());
  }

}

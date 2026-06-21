import {ChangeDetectionStrategy, Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {BasicDataInterface} from "@core/models/backend/basick-examples/tables.interface";
import {select, Store} from "@ngrx/store";
import * as basicExampleAction from "@pages/basic-example/store/basic-example.actions";
import * as basicExampleSelector from "@pages/basic-example/store/basic-example.selectors";
import {BasicSelectComponent} from "@shared/components/controls/basic-select/basic-select.component";
import {MultiSelectComponent} from "@shared/components/controls/multi-select/multi-select.component";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {FormField, form} from "@angular/forms/signals";
import {Value} from "@shared/types/frontend/types/control-item-interface";

@Component({
    selector: 'app-selectors',
    providers: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BasicSelectComponent,
    MultiSelectComponent,
    FormFieldComponent,
    FormField,
  ],
    templateUrl: './selectors.component.html',
    styleUrls: ['./selectors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorsComponent implements OnInit {

  public loading = signal<boolean | null>(false);
  protected readonly optionList = computed(() => [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ]);
  protected readonly multiSelectOptions = computed(() => [
    { label: 'Angular', value: 'angular' },
    { label: 'RxJS', value: 'rxjs' },
    { label: 'PrimeNG', value: 'primeng' },
    { label: 'NgRx', value: 'ngrx' }
  ]);
  public countries = signal<Observable<BasicDataInterface[]> | []>([]);
  public basicDropdownData$: Observable<BasicDataInterface[] | null> | undefined;
  private store: Store = inject(Store);
  protected isInline = signal<boolean>(true);
  protected readonly selectedStacks = signal<Value[]>(['angular', 'primeng']);

  ngOnInit(): void {


    //this.loading.set(this.store.pipe(select(basicExampleSelector.getLoading)));
    this.store.dispatch(basicExampleAction.dropdownInit());
    this.countries.set(this.store.pipe(select(basicExampleSelector.getBasicDropdownData)));
  }

  public form = signal<{ createdAt: [] | null }>({
      createdAt: []
  });

  public dropdownForm = form(this.form);

  protected onStacksChanged(values: Value[]): void {
    this.selectedStacks.set(values);
  }
}

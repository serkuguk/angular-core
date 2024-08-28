import {ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TuiDataList, TuiScrollable, TuiScrollbar, TuiTextfieldOptionsDirective} from '@taiga-ui/core';
import {TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiSelectModule} from '@taiga-ui/legacy';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@Component({
  selector: 'app-select',
  standalone: true,
  exportAs: "defaultSelector",
  imports: [
    TuiSelectModule,
    FormsModule,
    CdkVirtualScrollViewport,
    TuiDataList,
    TuiScrollbar,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    TuiScrollable,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  @Input() items: any[] = [];
  @Input() title: string = 'Select';
  @Input() placeholder: string = 'Choose your hero';
  @Output() changed = new EventEmitter<any>();

  protected testValue = new FormControl<string | null>(null);
  value: any;
  isDisabled?: boolean;

  ngOnInit() {}

  private propagateChange: any = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(value: any): void {
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
}

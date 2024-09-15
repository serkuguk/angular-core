import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {TuiDataList, TuiScrollable, TuiScrollbar, TuiSizeL, TuiSizeS, TuiVerticalDirection} from '@taiga-ui/core';
import {TuiDataListWrapper} from '@taiga-ui/kit';
import {TuiSelectModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {AsyncPipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-select',
  standalone: true,
  exportAs: "defaultSelector",
  imports: [
    TuiSelectModule,
    CdkVirtualScrollViewport,
    TuiDataList,
    TuiScrollbar,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    TuiScrollable,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    TuiDataListWrapper,
    AsyncPipe,
    TranslateModule,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor {

  public items = input<any>([]);
  public title = input<string>('Select');
  public direction = input<TuiVerticalDirection>('bottom');
  public tuiTextfieldSize = input<TuiSizeL | TuiSizeS>('m');
  public placeholder = input<string>('Choose your hero');
  public changed = output<any>();

  protected control = new FormControl<string | null>(null);
  value: any;
  isDisabled?: boolean;

  private propagateChange: any = () => { };

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    this.control.valueChanges.subscribe(this.propagateChange);
  }

  registerOnTouched(fn: any): void {
    // TODO add funcionalidad
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

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiComparator, TuiTable} from "@taiga-ui/addon-table";
import {WaIntersectionObserver} from "@ng-web-apis/intersection-observer";
import {TuiInputDateModule, TuiInputNumberModule, TuiSelectModule, TuiTextareaModule} from "@taiga-ui/legacy";
import {FormsModule, ValidatorFn} from "@angular/forms";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TuiDay, tuiDefaultSort, TuiLet, TuiValidator} from "@taiga-ui/cdk";
import {TuiDataListWrapper} from "@taiga-ui/kit";
import {TuiFormatNumberPipe, TuiIcon, TuiScrollbar} from "@taiga-ui/core";

interface Item {
  readonly date: TuiDay;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly unit: string;
}

@Component({
  selector: 'editable-table',
  standalone: true,
  exportAs: "Example3",
  imports: [
    TuiTable,
    WaIntersectionObserver,
    TuiTextareaModule,
    FormsModule,
    TuiInputNumberModule,
    NgIf,
    TuiValidator,
    TuiInputDateModule,
    TuiDataListWrapper,
    TuiSelectModule,
    NgForOf,
    TuiLet,
    TuiScrollbar,
    TuiFormatNumberPipe,
    AsyncPipe,
    TuiIcon,
  ],
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTableComponent {

  @Input() columns!: any[];

  protected readonly options = {updateOn: 'blur'} as const;
  protected readonly units = ['items', 'kg', 'm'];

  protected pythons: readonly Item[] = [
    {
      name: 'Holy Grail',
      price: 999999,
      quantity: 1,
      unit: this.units[0],
      date: TuiDay.currentLocal(),
    },
    {
      name: 'Foot',
      price: 29.95,
      quantity: 5,
      unit: this.units[2],
      date: TuiDay.currentLocal().append({day: -42}),
    },
    {
      name: 'Shed',
      price: 499,
      quantity: 2,
      unit: this.units[0],
      date: TuiDay.currentLocal().append({day: -237}),
    },
  ];

  protected starwars: readonly Item[] = [
    {
      name: 'Lightsaber',
      price: 4999,
      quantity: 3,
      unit: this.units[0],
      date: TuiDay.currentLocal(),
    },
    {
      name: 'Spaceship',
      price: 19999,
      quantity: 1,
      unit: this.units[0],
      date: TuiDay.currentLocal().append({day: -237}),
    },
    {
      name: 'Stormtrooper helmet',
      price: 14.95,
      quantity: 5,
      unit: this.units[0],
      date: TuiDay.currentLocal().append({day: -42}),
    },
  ];

  protected readonly minPrice: ValidatorFn = ({value}) =>
    value > 400 ? null : {minPrice: 'Price must be above $400'};

  protected readonly totalSorter: TuiComparator<Item> = (a, b) =>
    tuiDefaultSort(a.price * a.quantity, b.price * b.quantity);

  protected trackByIndex(index: number): number {
    return index;
  }

  protected getTotal({price, quantity}: Item): number {
    return price * quantity;
  }

  protected onValueChange<K extends keyof Item>(
    value: Item[K],
    key: K,
    current: Item,
    data: readonly Item[],
  ): void {
    const updated = {...current, [key]: value};

    this.pythons =
      data === this.pythons
        ? this.pythons.map((item) => (item === current ? updated : item))
        : this.pythons;

  }
}

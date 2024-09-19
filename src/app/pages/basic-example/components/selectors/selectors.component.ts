import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SelectComponent} from "@shared/components/controls/select/select.component";
import {Observable} from "rxjs";
import {BasicDataInterface} from "@core/models/backend/basick-examples/tables.interface";
import {select, Store} from "@ngrx/store";
import * as basicExampleAction from "@pages/basic-example/store/basic-example.actions";
import * as basicExampleSelector from "@pages/basic-example/store/basic-example.selectors";

@Component({
  selector: 'app-selectors',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    SelectComponent
  ],
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorsComponent implements OnInit {

  public loading$: Observable<boolean | null> | undefined;
  public countries = signal<Observable<BasicDataInterface[]> | []>([]);
  public basicDropdownData$: Observable<BasicDataInterface[] | null> | undefined;
  private store: Store = inject(Store);

  ngOnInit(): void {

    this.loading$ = this.store.pipe(select(basicExampleSelector.getLoading));
    this.store.dispatch(basicExampleAction.dropdownInit());
    //this.basicDropdownData$ = this.store.pipe(select(basicExampleSelector.getBasicDropdownData));
    this.countries.set(this.store.pipe(select(basicExampleSelector.getBasicDropdownData)));
  }
}

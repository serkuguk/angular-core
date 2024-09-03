import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { languages, positions, userItems } from './header-dummy-data';
import {AsyncPipe, NgClass, NgOptimizedImage} from "@angular/common";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {select, Store} from "@ngrx/store";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import * as fromAuth from "@pages/auth";
import {Observable} from "rxjs";
import {TuiFlagPipe} from '@taiga-ui/core';
import type {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {TUI_COUNTRIES} from '@taiga-ui/kit';

//Stor
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule,
    AsyncPipe,
    TuiFlagPipe,
    NgOptimizedImage
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent implements OnInit {
  public translate = inject(TranslateService);
  private store: Store<fromAuth.State> = inject(Store);
  public countryES: TuiCountryIsoCode = 'ES';
  public countryEN: TuiCountryIsoCode = 'FK';
  public countriesNames$:any = inject(TUI_COUNTRIES);

  public userData$: Observable<any | null> | undefined;
  public selectedLanguage: any;
  public languages = languages;
  public userItems = userItems;
  public userOverlay: boolean = false;

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
    this.selectedLanguage = this.languages[0];
    this.userData$ = this.store.pipe(select(fromLoginSelectors.getUser));
  }

  public userMenuToggle(): void {
    this.userOverlay = !this.userOverlay;
  }

  public executeUserEvent(eventName: string): void {
    const methodName = eventName as keyof this;

    if (typeof this[methodName] === 'function') {
      (this[methodName] as Function).apply(this);
    }
  }

  public logout(): void {
    this.store.dispatch(fromLoginAction.logOut({user: null}));
    this.store.dispatch(fromLoginAction.init());
  }
}
import {ChangeDetectionStrategy, Component, effect, inject, OnInit, signal} from '@angular/core';
import { languages, positions, userItems } from './header-dummy-data';
import {AsyncPipe, NgClass, NgOptimizedImage} from "@angular/common";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {select, Store} from "@ngrx/store";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import * as fromAuth from "@pages/auth";
import {Observable} from "rxjs";
import {TuiFlagPipe} from '@taiga-ui/core';
import type {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {TUI_COUNTRIES, TuiAvatar} from '@taiga-ui/kit';

//Stor
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";
import {AvatarComponent} from "@shared/components/avatar/avatar.component";
import {ShowPanelDirective} from "@core/directives/show-panel.directive";

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule,
    AsyncPipe,
    TuiFlagPipe,
    NgOptimizedImage,
    AvatarComponent,
    TuiAvatar,
    ShowPanelDirective
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
  public showPanel = signal<boolean>(false);
  private clickOutsideDirective = inject(ShowPanelDirective);

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
    this.selectedLanguage = this.languages[0];
    this.userData$ = this.store.pipe(select(fromLoginSelectors.getUser));

    effect(() => {
      const isClickedOutside = this.clickOutsideDirective.clickOutsideSignal();
      if (isClickedOutside && this.showPanel()) {
        this.showPanel.set(false);
      }
    })
  }

  public userMenuToggle(): void {
    this.showPanel.update((currentValue) => !currentValue);
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

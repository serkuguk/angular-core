import {Component, inject, OnInit} from '@angular/core';
import { languages, positions, userItems } from './header-dummy-data';
import {NgClass} from "@angular/common";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {select, Store} from "@ngrx/store";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import * as fromAuth from "@pages/auth";

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss'
})
export class UserPanelComponent implements OnInit {
  public translate = inject(TranslateService);
  private store: Store<fromAuth.State> = inject(Store);
  public selectedLanguage: any;
  public languages = languages;
  public userItems = userItems;

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
    this.selectedLanguage = this.languages[0];
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

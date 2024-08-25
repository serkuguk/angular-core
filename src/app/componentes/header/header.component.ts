import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import { languages, positions, userItems } from './header-dummy-data';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkMenuModule } from "@angular/cdk/menu";
//store
import {select, Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule,
            TranslateModule,
            ReactiveFormsModule,
            OverlayModule,
            CdkMenuModule],
  providers: [TranslateService]
})
export class HeaderComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  public selectedLanguage: any;
  public languages = languages;
  public userItems = userItems;
  public positions = positions;
  public userOverlay: boolean = false;
  public isAuthenticated$: Observable<boolean | null> | undefined;
  public userData$: Observable<any | null> | undefined;
  public translate = inject(TranslateService);
  private store: Store<fromAuth.State> = inject(Store);

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
    this.selectedLanguage = this.languages[0];
    this.isAuthenticated$ = this.store.pipe(select(fromLoginSelectors.getIsAuthenticated));
    this.userData$ = this.store.pipe(select(fromLoginSelectors.getUser));
  }

  public getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  public userMenuToggle(): void {
      this.userOverlay = !this.userOverlay;
  }

  public logout(): void {
    this.store.dispatch(fromLoginAction.logOut({user: null}));
    this.store.dispatch(fromLoginAction.init());
    this.isAuthenticated$ = this.store.pipe(select(fromLoginSelectors.getIsAuthenticated));
  }

  public executeUserEvent(eventName: string): void {
    const methodName = eventName as keyof this;

    if (typeof this[methodName] === 'function') {
      (this[methodName] as Function).apply(this);
    }
  }
}

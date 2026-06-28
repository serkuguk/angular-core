import {Component, OnInit, inject, ChangeDetectionStrategy, signal} from '@angular/core';
import {select, Store} from '@ngrx/store'
import { regexErrors } from 'src/app/shared/utils';

import * as fromAuth from '@pages/auth';
import * as fromLoginAction from '@pages/auth/store/user.actions';
import * as fromLoginSelectors from '@pages/auth/store/user.selectors';

import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {AuthTokenStorageService} from "@core/services/auth-token-storage.service";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {TranslateModule} from "@ngx-translate/core";
import {BasicInputComponent} from "@shared/components/controls/basic-input/basic-input.component";
import {PasswordInputComponent} from "@shared/components/controls/password-input/password-input.component";
import {ButtonComponent} from "@shared/components/button/button.component";
import {FormField, form, required, minLength, submit} from "@angular/forms/signals";

@Component({
  selector: 'app-login',
  providers: [AuthTokenStorageService],
  imports: [
    CommonModule,
    TranslateModule,
    FormFieldComponent,
    BasicInputComponent,
    PasswordInputComponent,
    ButtonComponent,
    FormField
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public isInline: boolean = false;
  public regexErrors = regexErrors
  public loading$: Observable<boolean | null> | undefined;
  public loadingError$: Observable<string | null> | undefined;

  private readonly store: Store<fromAuth.State> = inject(Store);

  public loginModel = signal({ username: '', password: '' });
  public loginForm = form(this.loginModel, (p) => {
    required(p.username);
    minLength(p.username, 3);
    required(p.password);
    minLength(p.password, 3);
  });

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromLoginSelectors.getLoading));
    this.store.dispatch(fromLoginAction.init());
  }

  login(): void {
    this.loadingError$ = this.store.pipe(select(fromLoginSelectors.getLoadingError));
    submit(this.loginForm, async () => {
      this.store.dispatch(fromLoginAction.login(this.loginModel()));
    });
  }
}

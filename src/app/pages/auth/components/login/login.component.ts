import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store'
import { markFormGroupTouched, regexErrors } from 'src/app/shared/utils';

import * as fromAuth from '@pages/auth';
import * as fromLoginAction from '@pages/auth/store/user.actions';
import * as fromLoginSelectors from '@pages/auth/store/user.selectors';

import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {AuthTokenStorageService} from "@core/services/auth-token-storage.service";
import {ButtonComponent} from "@app/shared";
import {TranslateModule} from "@ngx-translate/core";
import {InputPasswordModule} from "@shared/components/controls/input-pussword/input-password.module";
import {InputComponent} from "@shared/components/controls/input/input.component";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";


@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    AuthTokenStorageService
  ],
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   FormFieldComponent,
   InputComponent,
   ButtonComponent,
   TranslateModule,
   InputPasswordModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  public isInline: boolean = false;
  public regexErrors = regexErrors
  public loading$: Observable<boolean | null> | undefined;

  private fb = inject(FormBuilder);
  private store: Store<fromAuth.State> = inject(Store);

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromLoginSelectors.getLoading));
    this.store.dispatch(fromLoginAction.init());

    this.loginForm = this.fb.group({
        username: [null, {
          updateOn: 'blur',
              validators: [
                Validators.required,
                Validators.minLength(3)
              ]
          }],
          password: [null, {
            updateOn: 'blur',
              validators: [
                Validators.required,
                Validators.minLength(3)
              ]
          }]
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(fromLoginAction.login(this.loginForm.value));
    } else {
      markFormGroupTouched(this.loginForm);
    }
  }
}

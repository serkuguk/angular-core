import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store'
import { markFormGroupTouched, regexErrors } from 'src/app/shared/utils';

import * as fromRoot from '@app/store';
import * as fromLoginAction from '@pages/auth/store/user.actions';
import * as fromLoginSelectors from '@pages/auth/store/user.selectors';

import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {AuthTokenStorageService} from "@core/services/auth/auth-token-storage.service";


@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    AuthTokenStorageService
  ],
  imports: [
    CommonModule,
    FormsModule,
    /*ReactiveFormsModule,
   ormFieldModule,
   InputModule,
   ButtonModule,
   TranslateModule,
   InputPasswordModule*/
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
  private store: Store<fromRoot.State> = inject(Store);

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromLoginSelectors.getLoading));

    this.loginForm = this.fb.group({
        username: [null, {
          updateOn: 'blur',
              validators: [
                Validators.required,
                Validators.minLength(3)
              ]
          }],
          password: [null, {
              validators: [
                Validators.required,
                Validators.minLength(3)
              ]
          }]
      })
  }

  outputData(event: any) {
    console.log('OutPut Data', event);
  }

  login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(fromLoginAction.login(this.loginForm.value));
    } else {
      markFormGroupTouched(this.loginForm);
    }
  }
}

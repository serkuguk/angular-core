import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {select, Store} from '@ngrx/store'
import { AuthTokenStorageService } from 'src/app/core/services/auth/auth-token-storage.service';
import { markFormGroupTouched, regexErrors } from 'src/app/shared/utils';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import {Observable} from "rxjs";

interface IAuth {
  login: string
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  public isInline: boolean = false;
  public regexErrors = regexErrors
  public loading$: Observable<boolean | null> | undefined;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authTokenStorageService: AuthTokenStorageService = inject(AuthTokenStorageService);
  private authService: AuthService = inject(AuthService);
  private store: Store<fromRoot.State> = inject(Store);

  ngOnInit(): void {
    this.loading$ = this.store.pipe(select(fromUser.getLoading));

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
      const value = this.loginForm.value;

      const credentials: fromUser.UsernamePasswordCredentials = {
        username: value.username,
        password: value.password
      }

      this.store.dispatch(new fromUser.SignIn(credentials));

    } else {
      markFormGroupTouched(this.loginForm);
    }
  }
}

import { routerReducer } from '@ngrx/router-store';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestInterface } from '../../types/login-request_interface';
import {select, Store} from '@ngrx/store'
import { loginActions } from '../../store/actions/login.actions';
import { AuthTokenStorageService } from 'src/app/core/services/auth/auth-token-storage.service';

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
  //public regexErrors = regexErrors
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authTokenStorageService: AuthTokenStorageService = inject(AuthTokenStorageService);
  //private notificationService: NotificationService = inject(NotificationService);
  private authService: AuthService = inject(AuthService);
  private store: Store = inject(Store);

  ngOnInit(): void {
    if (this.authTokenStorageService.getUser()) {
      this.router.navigate(['main'])
    }

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
    const request: LoginRequestInterface = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    //this.store.dispatch(loginActions({request}));

    this.authService.login(request).subscribe(user => {
      console.log('user', user);
      
      //this.authTokenStorageService.saveToken(user.token);
      //this.authTokenStorageService.saveUser(user);

      //this.notificationService.showSnackBar("Successfully logged in")
      //this.router.navigate(['/'])
      //window.location.reload()
    })

    //this.router.navigate(['/basic-example']);
  }
}



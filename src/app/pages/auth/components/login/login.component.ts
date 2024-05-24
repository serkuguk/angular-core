import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        login: [null, {
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

      this.loginForm.controls.password.disable();
  }
  
  outputData(event: any) {
    console.log('OutPut Data', event);
  }

}

import { Component, OnInit } from '@angular/core';
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
  public isInline: boolean
  //public regexErrors = regexErrors

  constructor(private fb: FormBuilder) {
    this.isInline = true
  }

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
  }
  
  outputData(event: any) {
    console.log('OutPut Data', event);
  }

}

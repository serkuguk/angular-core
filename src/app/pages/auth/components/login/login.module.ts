import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/shared/components/controls/input/input.module';
import { FormFieldModule } from 'src/app/shared/components/controls/form-field/form-field.module';
import { ButtonModule } from 'src/app/shared/buttons';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormFieldModule,
    InputModule,
    ButtonModule,
    TranslateModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }

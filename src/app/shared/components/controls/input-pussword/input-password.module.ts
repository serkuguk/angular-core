import { TuiInputPasswordModule, TUI_INPUT_PASSWORD_DEFAULT_OPTIONS, TUI_INPUT_PASSWORD_OPTIONS } from "@taiga-ui/legacy";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from './input-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [InputPasswordComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputPasswordModule
    ],
    exports: [
        InputPasswordComponent
    ],
    providers: [
        {
          provide: TUI_INPUT_PASSWORD_OPTIONS,
          useValue: {
            ...TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
            icons: {
              hide: '@tui.eye-off',
              show: '@tui.eye',
            },
          },
        },
      ],
})
export class InputPasswordModule { }

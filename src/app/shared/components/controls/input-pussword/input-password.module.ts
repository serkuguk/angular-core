import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPasswordComponent } from './input-password.component';
import { TUI_INPUT_PASSWORD_DEFAULT_OPTIONS, TUI_INPUT_PASSWORD_OPTIONS, TuiInputPasswordModule } from '@taiga-ui/kit';

@NgModule({
    declarations: [InputPasswordComponent],
    imports: [
        CommonModule,
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
              hide: 'tuiIconEyeOff',
              show: 'tuiIconEye',
            },
          },
        },
      ],
})
export class InputPasswordModule { }

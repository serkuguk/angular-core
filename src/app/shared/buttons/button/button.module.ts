import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
    declarations: [ButtonComponent],
    imports: [
        CommonModule,
        TuiButtonModule
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule { }

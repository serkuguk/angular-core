import { TuiButton } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@NgModule({
    declarations: [ButtonComponent],
    imports: [
        CommonModule,
        TuiButton
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule { }

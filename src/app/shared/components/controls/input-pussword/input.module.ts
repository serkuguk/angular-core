import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputModule
    ],
    exports: [
        InputComponent
    ]
})
export class InputModule { }

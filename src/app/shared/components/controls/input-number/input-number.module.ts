import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { tuiNumberFormatProvider } from '@taiga-ui/core';

@NgModule({
    declarations: [InputComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputNumberModule
    ],
    exports: [
        InputComponent
    ],
    providers: [tuiNumberFormatProvider({decimalSeparator: ',', thousandSeparator: '.'})],
})
export class InputModule { }

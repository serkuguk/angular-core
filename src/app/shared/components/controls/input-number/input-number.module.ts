import { TuiInputNumberModule } from "@taiga-ui/legacy";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberComponent } from './input-number.component';
import { ReactiveFormsModule } from '@angular/forms';
import { tuiNumberFormatProvider, TuiNumberFormat } from '@taiga-ui/core';

@NgModule({
    declarations: [InputNumberComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputNumberModule,
        TuiNumberFormat
    ],
    exports: [
        InputNumberComponent
    ],
    providers: [tuiNumberFormatProvider({decimalSeparator: ',', thousandSeparator: '.'})],
})
export class InputNumberModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberComponent } from './input-number.component';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { tuiNumberFormatProvider } from '@taiga-ui/core';

@NgModule({
    declarations: [InputNumberComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiInputNumberModule
    ],
    exports: [
        InputNumberComponent
    ],
    providers: [tuiNumberFormatProvider({decimalSeparator: ',', thousandSeparator: '.'})],
})
export class InputNumberModule { }

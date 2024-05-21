import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date.component';
import { TuiCalendarModule } from '@taiga-ui/core';

@NgModule({
    declarations: [DateComponent],
    imports: [
        CommonModule,
        TuiCalendarModule
    ],
    exports: [
        DateComponent
    ]
})
export class DateModule { }

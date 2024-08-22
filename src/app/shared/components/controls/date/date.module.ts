import { TuiCalendar } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './date.component';

@NgModule({
    declarations: [DateComponent],
    imports: [
        CommonModule,
        TuiCalendar
    ],
    exports: [
        DateComponent
    ]
})
export class DateModule { }

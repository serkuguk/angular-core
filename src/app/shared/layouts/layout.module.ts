import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutModule } from './basic-layout/basic-layout.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BasicLayoutModule
    ],
    exports: [
        BasicLayoutModule
    ]
})
export class LayoutModule { }

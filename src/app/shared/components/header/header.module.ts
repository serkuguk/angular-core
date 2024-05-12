import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }

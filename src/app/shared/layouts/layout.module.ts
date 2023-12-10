import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPhotoModule } from './user-photo/user-photo.module';
import { BasicLayoutModule } from './basic-layout/basic-layout.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UserPhotoModule,
        BasicLayoutModule
    ],
    exports: [
        UserPhotoModule,
        BasicLayoutModule
    ]
})
export class LayoutModule { }

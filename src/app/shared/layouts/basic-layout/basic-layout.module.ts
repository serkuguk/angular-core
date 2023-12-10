import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '../../buttons';
import { BasicLayoutComponent } from './basic-layout.component';


@NgModule({
  imports: [CommonModule, ButtonsModule],
  declarations: [BasicLayoutComponent],
  exports: [BasicLayoutComponent]
})
export class BasicLayoutModule { }

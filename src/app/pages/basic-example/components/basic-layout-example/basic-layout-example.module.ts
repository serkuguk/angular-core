import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutExampleComponent } from './basic-layout-example.component';
import { BasicLayoutModule } from 'src/app/shared/layouts/basic-layout/basic-layout.module';
import { ControlsModule } from 'src/app/shared/controls';
import { DynamicTableModule } from 'src/app/shared/components';


@NgModule({
  declarations: [BasicLayoutExampleComponent],
  imports: [
    CommonModule,
    ControlsModule,
    DynamicTableModule,
    BasicLayoutModule
  ],
  exports: [BasicLayoutExampleComponent]
})
export class BasicLayoutExampleModule { }

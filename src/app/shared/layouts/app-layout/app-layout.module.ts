import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AppLayoutComponent} from './app-layout.component';
import {ButtonsModule} from "../../buttons";
import {PaginatorModule} from "primeng/paginator";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "@shared/components/messages/message.module";
import {SharedModule} from "@shared/shared.module";

@NgModule({
  imports: [CommonModule,
    ButtonsModule,
    PaginatorModule,
    ButtonModule,
    MessageModule,
    SharedModule
  ],
  declarations: [AppLayoutComponent],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule {
}

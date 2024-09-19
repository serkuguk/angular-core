import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";

import {ButtonComponent} from "@shared/components/buttons";
import {LoaderComponent} from "@shared/components/loader/loader.component";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-buttons',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    ButtonComponent,
    LoaderComponent,
    TranslateModule
  ],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent{

}

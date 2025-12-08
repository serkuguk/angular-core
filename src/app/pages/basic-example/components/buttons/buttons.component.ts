import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";

/*import {ButtonComponent} from "@shared/components/button";
import {LoaderComponent} from "@shared/components/loader/loader.component";*/
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "@shared/components/button/button.component";


@Component({
    selector: 'show-button',
    providers: [],
  imports: [
    CommonModule,
    /*ButtonComponent,
    LoaderComponent,*/
    TranslateModule,
    ButtonComponent
  ],
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonsComponent{

}

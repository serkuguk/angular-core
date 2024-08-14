import {Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { ISideNavToggle } from './componentes/sidenav/interfaces/side-nav-toggle.interface';
import {CommonModule} from "@angular/common";
import {LoginComponent} from "@pages/auth/components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    LoginComponent,
    /*AppRoutingModule,*/
    /*BrowserAnimationsModule,
    TuiRootModule,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    SidenavComponent,*/
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'nttdata';
  public nameComponent: string = 'Home Component';
  public isSideNavCollapsed: boolean = false;
  public screenWidth: number = 0;

  constructor (public translate: TranslateService) {
    translate.setDefaultLang('sp');
  }

  public onToggleSideNav(data: ISideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}

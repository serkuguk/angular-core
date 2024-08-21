import {Component, inject} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { ISideNavToggle } from './componentes/sidenav/interfaces/side-nav-toggle.interface';
import { LoginComponent } from "@pages/auth/components/login/login.component";
import { HeaderComponent } from "@app/componentes/header/header.component"
import {BodyComponent, FooterComponent, SidenavComponent} from "@app/componentes";
import {TuiRootModule} from "@taiga-ui/core";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [LoginComponent,
            TuiRootModule,
            HeaderComponent,
            BodyComponent,
            FooterComponent,
            SidenavComponent],
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

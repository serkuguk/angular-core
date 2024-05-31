import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISideNavToggle } from './componentes/sidenav/interfaces/side-nav-toggle.interface';

@Component({
  selector: 'app-root',
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

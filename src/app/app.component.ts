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
  public sreenWidth: number = 0;
  //temp
  public collapsed: boolean = false;
  public screenWidth: number = 0;

  constructor (public translate: TranslateService) {
    translate.setDefaultLang('sp');
  }

  public onToggleSideNav(data: ISideNavToggle): void {
    this.sreenWidth = data.screenWidht;
    this.isSideNavCollapsed = data.collapsed;
  }

  public getBoddyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-treemed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.sreenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}

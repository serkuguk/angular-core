import { CommonModule } from '@angular/common';
import { navabarData } from './nav-data';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ISideNavToggle } from './interfaces/side-nav-toggle.interface';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  @Output() onToggleSideNav: EventEmitter<ISideNavToggle> = new EventEmitter();

  public collapsed: boolean = false;
  public screenWidth: number = 0;
  public navData: any = navabarData;

  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidth});
  }

  public closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidht: this.screenWidth});
  }
}

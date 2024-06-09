import { CommonModule } from '@angular/common';
import { navabarData } from '../../nav-data';
import { Component, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { ISideNavToggle } from '../../interfaces/side-nav-toggle.interface';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { INavbarData } from '../../interfaces/nav-bar-data.interface';
import { SublevelMenuComponent } from '../sublevel-menu/sublevel-menu.component';
import { fadeInOut } from '../../utils/animation-helper';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule, SublevelMenuComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'}),
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
 
  @Output() onToggleSideNav: EventEmitter<ISideNavToggle> = new EventEmitter();

  public collapsed: boolean = false;
  public screenWidth: number = 0;
  public navData: any = navabarData;
  public multiple: boolean = false;
  public router: Router = inject(Router);
  
  @HostListener('window:resize', ['$event'])
  public onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  public toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  public closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  public getActiveClass(item: INavbarData): string {
    return this.router.url.includes(item.routerLink) ? 'active':'';
  }

  public hundleClick(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }
}
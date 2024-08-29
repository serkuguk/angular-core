import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {SublevelMenuComponent} from "@app/layouts";
import {fadeInOut} from "@layouts/components/sidenav/utils/animation-helper";
import {ISideNavToggle} from "@layouts/components/sidenav/interfaces/side-nav-toggle.interface";
import {navabarData} from "@layouts/components/sidenav/nav-data";
import {INavbarData} from "@layouts/components/sidenav/interfaces/nav-bar-data.interface";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,
    SublevelMenuComponent,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
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

  @HostListener('window:click', ['$event'])
  public onClose(event: any) {
    if(this.collapsed) {
      //this.collapsed = false;
      //this.onToggleSideNav.emit({collapsed: false, screenWidth: 10});
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
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  public shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}

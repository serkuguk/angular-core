import { CommonModule } from '@angular/common';
import {Component, EventEmitter, HostListener, OnInit, Output, inject, signal, ElementRef, output} from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {SublevelMenuComponent} from "@app/layouts";
import {fadeInOut} from "@layouts/components/sidenav/utils/animation-helper";
import {ISideNavToggle} from "@layouts/components/sidenav/interfaces/side-nav-toggle.interface";
import {navabarData} from "@layouts/components/sidenav/nav-data";
import {INavbarData} from "@layouts/components/sidenav/interfaces/nav-bar-data.interface";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,
    SublevelMenuComponent,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    TranslateModule
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

  public onToggleSideNav = output<ISideNavToggle>();

  public collapsed = signal<boolean>(false);

  public screenWidth = signal<number>(0);
  public navData: any = navabarData;
  public multiple: boolean = false;

  public router: Router = inject(Router);
  private elementRef = inject(ElementRef);

  @HostListener('body:resize', ['$event.target'])
  public onResize(event: any) { console.log('event', event);
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() <= 768) {
      this.collapsed.set(false);
      this.onToggleSideNav.emit({collapsed: this.collapsed(), screenWidth: this.screenWidth()});
    }
  }

  @HostListener('document:click', ['$event'])
  public onClosePanelExternalClick(event: MouseEvent): void {
    const clickedOutside = this.elementRef.nativeElement.contains(event.target as HTMLElement);
    if (!clickedOutside && this.collapsed()) {
      this.collapsed.set(false);
      this.onToggleSideNav.emit({collapsed: this.collapsed(), screenWidth: this.screenWidth()});
    }
  }

  ngOnInit(): void {
    this.screenWidth.set(window.innerWidth);
  }

  public toggleCollapse(): void {
    this.collapsed.update((collapsed) => !collapsed);
    this.onToggleSideNav.emit({collapsed: this.collapsed(), screenWidth: this.screenWidth()});
  }

  public closeSidenav(): void {
    this.collapsed.set(false);
    this.onToggleSideNav.emit({collapsed: this.collapsed(), screenWidth: this.screenWidth()});
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

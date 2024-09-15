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
import {TuiHint, TuiIcon} from "@taiga-ui/core";
import {ToolTipComponent} from "@shared/components/tool-tip/tool-tip.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,
    SublevelMenuComponent,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    TranslateModule,
    TuiHint, TuiIcon, ToolTipComponent
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

  //Floating menu
  public isSubMenuVisible: boolean = false;
  public hoveredMenuItem: any = null;
  public submenuPosition = { top: '0px', left: '0px' };
  private hideTimeout: any = null;

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

  //Floating mene
  public showSubMenu(menuItem: any, event: MouseEvent): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout); // Отменяем таймер скрытия, если пользователь вернулся на элемент
    }

    this.isSubMenuVisible = true;
    this.hoveredMenuItem = menuItem;

    // Вычисляем позицию всплывающего меню
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.submenuPosition = {
      top: `${rect.top}px`,
      left: `${rect.right + 19}px`
    };
  }

  public hideSubMenu(event: MouseEvent): void {
    this.hideTimeout = setTimeout(() => {
      this.isSubMenuVisible = false;
      this.hoveredMenuItem = null;
    }, 200);
  }

  public keepSubMenuOpen(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
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

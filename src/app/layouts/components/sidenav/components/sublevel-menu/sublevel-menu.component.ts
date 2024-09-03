import { Component, Input, inject } from '@angular/core';
import { INavbarData } from '../../interfaces/nav-bar-data.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../utils/animation-helper';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [CommonModule,
    RouterLinkActive,
    RouterLink,
    TranslateModule],
  templateUrl: './sublevel-menu.component.html',
  styleUrl: './sublevel-menu.component.scss',
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({overflow: 'hidden'}),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent {

  @Input() data: INavbarData = {
    routerLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed: boolean = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  public router: Router = inject(Router);

  public hundleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  public getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routerLink) ? 'active-sublevel':'';
  }

  public shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
  }
}

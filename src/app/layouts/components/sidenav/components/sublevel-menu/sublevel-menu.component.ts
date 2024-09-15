import {Component, inject, input} from '@angular/core';
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

  public data = input<INavbarData>({
    routerLink: '',
    icon: '',
    label: '',
    items: []
  });
  public collapsed = input<boolean>(false);
  public animating = input<boolean>(false);
  public expanded = input<boolean>(false);
  public multiple = input<boolean>(false);

  public router: Router = inject(Router);

  public hundleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  public getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routerLink) ? 'active-sublevel':'';
  }

  public shrinkItems(item: INavbarData): void {
    if (!this.multiple()) {
      const data = this.data();
      if (data.items && data.items.length > 0) {
        for(let modelItem of data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
  }
}

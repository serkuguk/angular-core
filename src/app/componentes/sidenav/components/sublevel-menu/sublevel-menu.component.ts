import { Component, Input } from '@angular/core';
import { INavbarData } from '../../interfaces/nav-bar-data.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sublevel-menu.component.html',
  styleUrl: './sublevel-menu.component.scss',
  animations: [
    trigger('submenu', [
      state('hidden', style({
        heght: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=>', [style({overflow: 'hidden'}),
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
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  public hundleClick(item: INavbarData): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for(let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }
}

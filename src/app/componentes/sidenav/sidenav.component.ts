import { CommonModule } from '@angular/common';
import { navabarData } from './nav-data';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  public collapsed: boolean = true;
  public navData: any = navabarData;
}

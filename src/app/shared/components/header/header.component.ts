import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  public translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
  }
}

import { CommonModule } from '@angular/common';
import {Component, inject, Input, OnInit} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers: [TranslateService]
})
export class FooterComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  public getFooterClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'footer-treemed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'footer-md-screen';
    }
    return styleClass;
  }

  public translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
  }
}

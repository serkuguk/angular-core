import { languages, positions, userItems } from './header-dummy-data';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkMenuModule } from "@angular/cdk/menu";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule,
            TranslateModule,
            ReactiveFormsModule,
            OverlayModule,
            CdkMenuModule],
  providers: [TranslateService]
})
export class HeaderComponent implements OnInit {

  @Input() collapsed: boolean = false;
  @Input() screenWidth: number = 0;

  public selectedLanguage: any;
  public languages = languages;
  public userItems = userItems;
  public positions = positions;
  public userOverlay: boolean = false;

  public translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
    this.selectedLanguage = this.languages[0];
  }

  public getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  public userMenuToggle(): void {
      this.userOverlay = !this.userOverlay;
  }
}

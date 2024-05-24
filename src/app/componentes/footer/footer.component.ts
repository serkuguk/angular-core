import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
  
  public translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang('sp');
  }
}

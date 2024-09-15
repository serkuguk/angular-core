import {Component, inject, input, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs";
import { languages, positions, userItems } from './header-dummy-data';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkMenuModule } from "@angular/cdk/menu";
//store
import {select, Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";
import {UserPanelComponent} from "@app/componentes/user-panel/user-panel.component";
import {TuiFlagPipe} from "@taiga-ui/core";
import type {TuiCountryIsoCode} from "@taiga-ui/i18n";
import {TUI_COUNTRIES} from "@taiga-ui/kit";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        OverlayModule,
        CdkMenuModule,
        UserPanelComponent,
        TuiFlagPipe
    ],
  providers: [TranslateService]
})
export class HeaderComponent implements OnInit {
  collapsed = input<boolean>(false);
  screenWidth = input<number>(0);

  public isAuthenticated$: Observable<boolean | null> | undefined;
  public translate = inject(TranslateService);
  private store: Store<fromAuth.State> = inject(Store);
  public countryES: TuiCountryIsoCode = 'ES';
  public countryEN: TuiCountryIsoCode = 'FK';
  public countriesNames$:any = inject(TUI_COUNTRIES);

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(fromLoginSelectors.getIsAuthenticated));
  }

  public getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed() && this.screenWidth() > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }
}

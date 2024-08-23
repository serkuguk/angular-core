import {Component, inject, OnInit} from '@angular/core';
import { ISideNavToggle } from './componentes/sidenav/interfaces/side-nav-toggle.interface';
import { LoginComponent } from "@pages/auth/components/login/login.component";
import { HeaderComponent } from "@app/componentes/header/header.component"
import {BodyComponent, FooterComponent } from "@app/componentes";
import {SidenavComponent} from "@app/componentes/sidenav/components/sidenav/sidenav.component";
import {select, Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import {Observable} from "rxjs";
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";
import {AsyncPipe, JsonPipe} from "@angular/common";
import * as fromLoginAction from "@pages/auth/store/user.actions";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [SidenavComponent,
    LoginComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AsyncPipe,
    JsonPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isSideNavCollapsed: boolean = false;
  public screenWidth: number = 0;
  public store: Store<fromAuth.State> = inject(Store);
  public isAuthenticated$: Observable<boolean | null> | undefined;

  ngOnInit(): void {
    this.store.dispatch(fromLoginAction.init());
    this.isAuthenticated$ = this.store.pipe(select(fromLoginSelectors.getIsAuthenticated));
  }

  public onToggleSideNav(data: ISideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}

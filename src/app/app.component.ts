import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import { ISideNavToggle } from '@layouts/components/sidenav/interfaces/side-nav-toggle.interface';
import { LoginComponent } from "@pages/auth/components/login/login.component";
import {AsyncPipe, JsonPipe} from "@angular/common";

//Store
import {select, Store} from "@ngrx/store";
import * as fromAuth from "@pages/auth";
import * as fromLoginSelectors from "@pages/auth/store/user.selectors";
import * as fromLoginAction from "@pages/auth/store/user.actions";
import {BodyComponent} from "@layouts/components/body/body.component";
import {HeaderComponent } from "@layouts/components/header/header.component";
import {FooterComponent} from "@layouts/components/footer/footer.component";
import {SidenavComponent} from "@layouts/components/sidenav/components/sidenav/sidenav.component";
import {TuiRoot} from "@taiga-ui/core";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    TuiRoot,
    SidenavComponent,
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

  sum(a: number, b: number) {
    return a + b;
  }
}

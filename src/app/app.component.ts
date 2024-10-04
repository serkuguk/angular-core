import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {Observable, Subject} from "rxjs";
import { ISideNavToggle } from '@layouts/components/sidenav/interfaces/side-nav-toggle.interface';
import { LoginComponent } from "@pages/auth/components/login/login.component";
import {AsyncPipe, CommonModule, JsonPipe} from "@angular/common";

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
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TuiRoot,
    SidenavComponent,
    LoginComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AsyncPipe,
    JsonPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public isSideNavCollapsed = signal<boolean>(false);
  public screenWidth = signal<number>(0);

  public store: Store<fromAuth.State> = inject(Store);
  public router: Router = inject(Router);
  public isAuthenticated$: Observable<boolean> | undefined;

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.store.dispatch(fromLoginAction.init());
    });

    this.isAuthenticated$ = this.store.pipe(select(fromLoginSelectors.getIsAuthenticated));
  }

  public onToggleSideNav(data: ISideNavToggle): void {
    this.screenWidth.set(data.screenWidth);
    this.isSideNavCollapsed.set(data.collapsed);
  }

  sum(a: number, b: number) {
    return a + b;
  }
}

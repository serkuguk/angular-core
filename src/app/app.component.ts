import {ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, OnInit, Renderer2, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Observable} from "rxjs";
import {ISideNavToggle} from '@layouts/components/sidenav/interfaces/side-nav-toggle.interface';
import {CommonModule} from "@angular/common";

//Store
import {select, Store} from "@ngrx/store";
import {getIsAuthenticated, init, State} from "@pages/auth";
import {BodyComponent} from "@layouts/components/body/body.component";
import {HeaderComponent} from "@layouts/components/header/header.component";
import {FooterComponent} from "@layouts/components/footer/footer.component";
import {SidenavComponent} from "@layouts/components/sidenav/components/sidenav/sidenav.component";
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        SidenavComponent,
        HeaderComponent,
        BodyComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public isSideNavCollapsed = signal<boolean>(false);
    public screenWidth = signal<number>(window.innerWidth);
    public mobileOpen = signal<boolean>(false);

    public store: Store<State> = inject(Store);
    public router: Router = inject(Router);
    private readonly renderer = inject(Renderer2);
    private readonly destroyRef = inject(DestroyRef);
    public isAuthenticated$: Observable<boolean> | undefined;

    @HostListener('window:resize')
    public onWindowResize(): void {
        this.screenWidth.set(window.innerWidth);
        if (window.innerWidth > 768 && this.mobileOpen()) {
            this.onSidenavClose();
        }
    }

    ngOnInit(): void {

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(() => {
            this.onSidenavClose();
            this.store.dispatch(init());
        });

        this.isAuthenticated$ = this.store.pipe(select(getIsAuthenticated));
        this.isAuthenticated$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(authenticated => {
            if (!authenticated) this.onSidenavClose();
        });
        this.destroyRef.onDestroy(() => this.onSidenavClose());
    }

    public onToggleSideNav(data: ISideNavToggle): void {
        this.screenWidth.set(data.screenWidth);
        this.isSideNavCollapsed.set(data.collapsed);
    }

    public onHamburgerClick(): void {
        this.mobileOpen.set(true);
        this.renderer.addClass(document.body, 'mobile-nav-open');
    }

    public onSidenavClose(): void {
        if (this.mobileOpen() && document.activeElement?.closest('.sidenav')) {
            document.querySelector<HTMLButtonElement>('.hamburger-btn')?.focus();
        }
        this.mobileOpen.set(false);
        this.renderer.removeClass(document.body, 'mobile-nav-open');
    }

}

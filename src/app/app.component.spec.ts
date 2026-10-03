import {TestBed} from '@angular/core/testing';
import {NavigationEnd, Router} from '@angular/router';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Subject} from 'rxjs';
import {getIsAuthenticated} from '@pages/auth';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  const events = new Subject<NavigationEnd>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({selectors: [{selector: getIsAuthenticated, value: true}]}),
        {provide: Router, useValue: {events: events.asObservable()}},
      ],
    });
    TestBed.overrideComponent(AppComponent, {set: {template: ''}});
  });

  afterEach(() => document.body.classList.remove('mobile-nav-open'));

  it('creates through TestBed and updates the sidenav state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.onToggleSideNav({screenWidth: 1200, collapsed: true});

    expect(component.screenWidth()).toBe(1200);
    expect(component.isSideNavCollapsed()).toBe(true);
  });

  it('releases the mobile scroll lock on navigation and logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.onHamburgerClick();
    expect(document.body.classList.contains('mobile-nav-open')).toBe(true);

    events.next(new NavigationEnd(1, '/basic', '/basic'));
    expect(component.mobileOpen()).toBe(false);
    expect(document.body.classList.contains('mobile-nav-open')).toBe(false);

    component.onHamburgerClick();
    const store = TestBed.inject(MockStore);
    store.overrideSelector(getIsAuthenticated, false);
    store.refreshState();
    expect(component.mobileOpen()).toBe(false);
    expect(document.body.classList.contains('mobile-nav-open')).toBe(false);
  });

  it('cleans up the lock and subscriptions when destroyed', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const store = TestBed.inject(MockStore);
    const dispatch = jest.spyOn(store, 'dispatch');
    fixture.componentInstance.onHamburgerClick();
    fixture.destroy();

    expect(document.body.classList.contains('mobile-nav-open')).toBe(false);
    events.next(new NavigationEnd(2, '/other', '/other'));
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('returns drawer focus to the hamburger before closing', () => {
    TestBed.overrideComponent(AppComponent, {set: {template: '<button class="hamburger-btn">Open</button><nav class="sidenav"><button>Close</button></nav>'}});
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const hamburger: HTMLButtonElement = fixture.nativeElement.querySelector('.hamburger-btn');
    const close: HTMLButtonElement = fixture.nativeElement.querySelector('.sidenav button');
    component.onHamburgerClick();
    close.focus();

    component.onSidenavClose();

    expect(document.activeElement).toBe(hamburger);
    expect(component.mobileOpen()).toBe(false);
  });
});

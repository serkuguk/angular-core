import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {provideTranslateService} from '@ngx-translate/core';
import {SidenavComponent} from './sidenav.component';

@Component({template: ''})
class RouteTarget {}

describe('SidenavComponent navigation', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SidenavComponent],
    providers: [provideTranslateService(), provideRouter([{path: 'target', component: RouteTarget}])],
  }));

  function createSidenav(width: number) {
    const fixture = TestBed.createComponent(SidenavComponent);
    fixture.componentInstance.navData = [{
      routerLink: '/examples', label: 'Examples', icon: 'pi pi-list',
      items: [{routerLink: '/target', label: 'Target', icon: ''}],
    }];
    fixture.detectChanges();
    fixture.componentInstance.screenWidth.set(width);
    fixture.detectChanges();
    return fixture;
  }

  it('expands the desktop rail and submenu through a native parent button', () => {
    const fixture = createSidenav(1200);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.sidenav-nav-link');
    expect(button.tagName).toBe('BUTTON');
    expect(button.type).toBe('button');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.collapsed()).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('.sublevel-nav-link').getAttribute('href')).toBe('/target');

    fixture.componentInstance.closeSidenav();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('.sublevel-nav-link')).toBeTruthy();
  });

  it('keeps the closed mobile drawer inert and emits close for a nested link', async () => {
    const fixture = createSidenav(600);
    const nav: HTMLElement = fixture.nativeElement.querySelector('nav');
    expect(nav.hasAttribute('inert')).toBe(true);

    fixture.componentRef.setInput('mobileOpen', true);
    fixture.detectChanges();
    expect(nav.hasAttribute('inert')).toBe(false);
    const close = jest.fn();
    fixture.componentInstance.onClose.subscribe(close);
    fixture.nativeElement.querySelector('.sidenav-nav-link').click();
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.sublevel-nav-link').click();
    await fixture.whenStable();
    expect(close).toHaveBeenCalledTimes(1);

    fixture.componentRef.setInput('mobileOpen', false);
    fixture.detectChanges();
    expect(nav.hasAttribute('inert')).toBe(true);
  });
});

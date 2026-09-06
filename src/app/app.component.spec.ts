import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {provideMockStore} from '@ngrx/store/testing';
import {Subject} from 'rxjs';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  it('creates through TestBed and updates the sidenav state', () => {
    const events = new Subject();
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore(),
        {provide: Router, useValue: {events: events.asObservable()}},
      ],
    });
    TestBed.overrideComponent(AppComponent, {set: {template: ''}});
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.onToggleSideNav({screenWidth: 1200, collapsed: true});

    expect(component.screenWidth()).toBe(1200);
    expect(component.isSideNavCollapsed()).toBe(true);
  });
});

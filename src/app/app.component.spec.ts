import {TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {AppComponent} from './app.component';

describe('AppComponent (unit methods only)', () => {
    let component: AppComponent;

    beforeEach(async () => {
        const routerEvents$ = new Subject<any>();

        await TestBed.configureTestingModule({
            providers: [
                provideMockStore(),
                {
                    provide: Router,
                    useValue: {
                        events: routerEvents$.asObservable(),
                        navigate: jest.fn(),
                    },
                },
            ],
        }).compileComponents();

        component = TestBed.runInInjectionContext(() => new AppComponent());
    });

    describe('onToggleSideNav', () => {
        it('updates screenWidth and isSideNavCollapsed', () => {
            component.onToggleSideNav({screenWidth: 1200, collapsed: true});
            expect(component.screenWidth()).toBe(1200);
            expect(component.isSideNavCollapsed()).toBe(true);
        });

        it('handles collapsed = false', () => {
            component.onToggleSideNav({screenWidth: 800, collapsed: false});
            expect(component.screenWidth()).toBe(800);
            expect(component.isSideNavCollapsed()).toBe(false);
        });
    });
});



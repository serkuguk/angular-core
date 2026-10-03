import {TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {TranslateModule} from '@ngx-translate/core';
import {getUser, logOut} from '@pages/auth';
import {UserPanelComponent} from './user-panel.component';

describe('UserPanelComponent menu controls', () => {
  it('opens with a native named button and logs out through a native action', () => {
    TestBed.configureTestingModule({
      imports: [UserPanelComponent, TranslateModule.forRoot()],
      providers: [provideMockStore({selectors: [{selector: getUser, value: null}]})],
    });
    const fixture = TestBed.createComponent(UserPanelComponent);
    fixture.detectChanges();
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.user-panel-avatar');
    expect(toggle.tagName).toBe('BUTTON');
    expect(toggle.getAttribute('aria-label')).toBeTruthy();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    const dispatch = jest.spyOn(TestBed.inject(MockStore), 'dispatch');
    const logout: HTMLButtonElement = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('.overlay-user li button'))
      .find(button => button.textContent?.includes('LOGOUT'))!;
    expect(logout.type).toBe('button');
    logout.click();
    expect(dispatch).toHaveBeenCalledWith(logOut({user: null}));
  });
});

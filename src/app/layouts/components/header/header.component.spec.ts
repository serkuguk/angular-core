import {TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {getIsAuthenticated} from '@pages/auth';
import {HeaderComponent} from './header.component';

describe('HeaderComponent language controls', () => {
  it('renders named native buttons and switches the language on activation', () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [provideMockStore({selectors: [{selector: getIsAuthenticated, value: false}]})],
    });
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const translate = TestBed.inject(TranslateService);
    const use = jest.spyOn(translate, 'use');
    const buttons: HTMLButtonElement[] = Array.from(fixture.nativeElement.querySelectorAll('.language button'));
    expect(buttons).toHaveLength(2);
    expect(buttons.every(button => button.type === 'button' && button.getAttribute('aria-label'))).toBe(true);
    buttons[1].click();
    expect(use).toHaveBeenCalledWith('en');
  });
});

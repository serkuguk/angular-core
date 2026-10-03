import {TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {getBasicDropdownData} from '@pages/basic-example/store/basic-example.selectors';
import {SelectorsComponent} from './selectors.component';

describe('SelectorsComponent with the packaged select', () => {
  beforeAll(() => Object.defineProperty(window, 'matchMedia', {
    configurable: true, value: jest.fn(() => ({matches: false})),
  }));
  afterAll(() => Reflect.deleteProperty(window, 'matchMedia'));

  it('stores the selected code and propagates actual blur to the signal form', async () => {
    TestBed.configureTestingModule({
      imports: [SelectorsComponent],
      providers: [provideMockStore({selectors: [{selector: getBasicDropdownData, value: []}]})],
    });
    const fixture = TestBed.createComponent(SelectorsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const select: HTMLElement = fixture.nativeElement.querySelector('p-select');
    select.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const rome = Array.from<HTMLElement>(document.querySelectorAll('[role="option"]'))
      .find(option => option.textContent?.trim() === 'Rome');
    expect(rome).toBeDefined();
    rome!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.form().createdAt).toBe('RM');

    const combobox: HTMLElement = select.querySelector('[role="combobox"]')!;
    combobox.focus();
    combobox.blur();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.dropdownForm.createdAt().touched()).toBe(true);
  });
});

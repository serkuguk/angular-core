import {TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {FormsComponent} from './forms.component';

describe('FormsComponent with the packaged select', () => {
  beforeAll(() => Object.defineProperty(window, 'matchMedia', {
    configurable: true, value: jest.fn(() => ({matches: false})),
  }));
  afterAll(() => Reflect.deleteProperty(window, 'matchMedia'));

  beforeEach(() => TestBed.configureTestingModule({
    imports: [FormsComponent, TranslateModule.forRoot()],
  }));

  it('stores LEGAL as a string and displays the INN field after a real option click', async () => {
    const fixture = TestBed.createComponent(FormsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const select: HTMLElement = fixture.nativeElement.querySelector('p-select');
    select.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const legal = Array.from<HTMLElement>(document.querySelectorAll('[role="option"]'))
      .find(option => option.textContent?.trim() === 'Legal');
    expect(legal).toBeDefined();
    legal!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.model().type).toBe('LEGAL');
    const labels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('app-basic-input label'))
      .map(label => label.textContent?.trim());
    expect(labels).toContain('Enter INN');
    expect(labels).not.toContain('Enter Last Name');
  });

  it('marks the form field touched when the real select loses focus', async () => {
    const fixture = TestBed.createComponent(FormsComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.form.type().touched()).toBe(false);
    expect(fixture.nativeElement.querySelector('.select_wrapper').classList.contains('select_disabled')).toBe(false);
    const combobox: HTMLElement = fixture.nativeElement.querySelector('p-select [role="combobox"]');
    combobox.focus();
    combobox.blur();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.form.type().touched()).toBe(true);
  });
});

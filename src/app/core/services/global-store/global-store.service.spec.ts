import {TestBed} from '@angular/core/testing';
import {APP_STATE} from '@shared/tokens/store-token.constant';
import {GLOBAL_STORE_CONFIG, GlobalStoreService} from './global-store.service';

describe('GlobalStoreService', () => {
  beforeEach(() => localStorage.clear());

  it('does not delete keys owned by other services when localStorage rejects a write', () => {
    localStorage.setItem('access_token', 'access');
    localStorage.setItem('foreign-preference', 'keep');
    const setItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      if (key === 'GLOBAL_STORE_STATE') {
        throw new DOMException('quota exceeded', 'QuotaExceededError');
      }
      return undefined;
    });

    TestBed.configureTestingModule({
      providers: [
        GlobalStoreService,
        {provide: APP_STATE, useValue: {value: 'initial'}},
        {provide: GLOBAL_STORE_CONFIG, useValue: {enableLogging: false}},
      ],
    });
    const service = TestBed.inject<GlobalStoreService<{value: string}>>(GlobalStoreService);
    service.set('value', 'next');

    expect(localStorage.getItem('access_token')).toBe('access');
    expect(localStorage.getItem('foreign-preference')).toBe('keep');
    setItem.mockRestore();
  });
});

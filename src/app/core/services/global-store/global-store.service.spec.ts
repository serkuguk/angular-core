import {GlobalSharedService} from '@shared/services/global-shared.service';
import {GlobalStoreState} from './interfaces/global-store.interface';
import {GlobalStoreService} from './global-store.service';

describe('GlobalStoreService', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => jest.restoreAllMocks());

  it('hydrates and removes saved state when quota rejects every write', () => {
    localStorage.setItem('GLOBAL_STORE_STATE', JSON.stringify({value: 'saved'}));
    localStorage.setItem('access_token', 'access');
    localStorage.setItem('foreign-preference', 'keep');
    localStorage.setItem('__localStorage_test__', 'foreign probe key');
    const setItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota exceeded', 'QuotaExceededError');
    });
    const service = new GlobalStoreService({value: 'initial'}, {enableLogging: false});

    expect(service.getState()).toEqual({value: 'saved'});
    expect(service.select('value')()).toBe('saved');
    expect(service.getStorageInfo()).toMatchObject({isAvailable: true, currentSize: 17});
    expect(service.clearAll()).toBe(true);
    expect(service.getState()).toEqual({value: 'initial'});
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBeNull();
    expect(localStorage.getItem('access_token')).toBe('access');
    expect(localStorage.getItem('foreign-preference')).toBe('keep');
    expect(localStorage.getItem('__localStorage_test__')).toBe('foreign probe key');
    expect(setItem.mock.calls.map(([key]) => key)).toEqual(['GLOBAL_STORE_STATE']);
  });

  it('reports failed writes from every mutation while updating memory immediately', () => {
    const service = new GlobalStoreService({value: 'initial'}, {enableLogging: false});
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota exceeded', 'QuotaExceededError');
    });

    expect(service.set('value', 'next')).toBe(false);
    expect(service.getValue('value')).toBe('next');
    expect(service.updateStore('value', value => value + ' updated')).toBe(false);
    expect(service.select('value')()).toBe('next updated');
    expect(service.clear('value')).toBe(false);
    expect(service.getState()).toEqual({});
    expect(service.reset({value: 'reset'})).toBe(false);
    expect(service.getState()).toEqual({value: 'reset'});
    expect(service.patchState({value: 'patched'})).toBe(false);
    expect(service.state()()).toEqual({value: 'patched'});
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe(JSON.stringify({value: 'initial'}));
  });

  it('reports serialization failures without losing the in-memory update or saved state', () => {
    const service = new GlobalStoreService<{value: object}>({value: {}}, {enableLogging: false});
    const circular: {self?: object} = {};
    circular.self = circular;

    expect(service.set('value', circular)).toBe(false);
    expect(service.getValue('value')).toBe(circular);
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe('{"value":{}}');
  });

  it('reports configured size rejection without replacing the saved state', () => {
    const service = new GlobalStoreService({value: ''}, {enableLogging: false, maxStorageSize: 20});

    expect(service.set('value', 'too large to persist')).toBe(false);
    expect(service.getValue('value')).toBe('too large to persist');
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe('{"value":""}');
  });

  it('resets memory and reports a denied removal without logging success', () => {
    const service = new GlobalStoreService({value: 'initial'});
    expect(service.set('value', 'changed')).toBe(true);
    const info = jest.spyOn(console, 'info').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('access denied', 'SecurityError');
    });

    expect(service.clearAll()).toBe(false);
    expect(service.getState()).toEqual({value: 'initial'});
    expect(service.select('value')()).toBe('initial');
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe('{"value":"changed"}');
    expect(info).not.toHaveBeenCalled();
  });

  it('clears, reads, selects, writes and reloads without resurrecting cleared values', () => {
    const initial = {value: 'initial', other: 'default'};
    const service = new GlobalStoreService(initial, {enableLogging: false});
    expect(service.patchState({value: 'changed', other: 'old value'})).toBe(true);
    expect(service.clearAll()).toBe(true);
    expect(service.getState()).toEqual(initial);
    expect(service.select('value')()).toBe('initial');
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBeNull();
    expect(service.set('value', 'new value')).toBe(true);

    const reloaded = new GlobalStoreService(initial, {enableLogging: false});
    expect(reloaded.getState()).toEqual({value: 'new value', other: 'default'});
  });

  it('persists update, field removal and reset successfully', () => {
    const service = new GlobalStoreService({value: 'initial'}, {enableLogging: false});
    expect(service.updateStore('value', value => value + ' updated')).toBe(true);
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe('{"value":"initial updated"}');
    expect(service.clear('value')).toBe(true);
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe('{}');
    expect(service.reset({value: 'reset'})).toBe(true);
    expect(localStorage.getItem('GLOBAL_STORE_STATE')).toBe('{"value":"reset"}');
  });

  it('propagates persistence results through all shared wrapper mutations', () => {
    const initial: GlobalStoreState = {dataString: '', dataArray: [], dataObject: null, dataNumber: undefined};
    const store = new GlobalStoreService(initial, {enableLogging: false});
    const wrapper = new GlobalSharedService(store);

    expect(wrapper.setDataString('dataString', 'next')).toBe(true);
    expect(wrapper.setDataNumber('dataNumber', 1)).toBe(true);
    expect(wrapper.setDataArray('dataArray', ['next'])).toBe(true);
    expect(wrapper.setDataObject('dataObject', {value: 'next'})).toBe(true);
    expect(wrapper.reset(initial)).toBe(true);
    expect(wrapper.clearAll()).toBe(true);
    expect(wrapper.clear()).toBe(true);

    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('quota exceeded', 'QuotaExceededError');
    });
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new DOMException('access denied', 'SecurityError');
    });

    expect(wrapper.setDataString('dataString', 'unsaved')).toBe(false);
    expect(wrapper.setDataNumber('dataNumber', 2)).toBe(false);
    expect(wrapper.setDataArray('dataArray', ['unsaved'])).toBe(false);
    expect(wrapper.setDataObject('dataObject', {value: 'unsaved'})).toBe(false);
    expect(wrapper.reset(initial)).toBe(false);
    expect(wrapper.clearAll()).toBe(false);
    expect(wrapper.clear()).toBe(false);
  });
});

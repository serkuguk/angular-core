import { GlobalStoreConfig, GlobalStoreService } from './global-store/global-store.service';

export class BaseStoreService<T extends object> {
  protected store: GlobalStoreService<T>;

  constructor(initialState: T, config: GlobalStoreConfig) {
    this.store = new GlobalStoreService<T>(initialState, config);
  }

  getValue<K extends keyof T>(key: K): T[K] {
    return this.store.getValue(key);
  }

  setValue<K extends keyof T>(key: K, value: T[K]): void {
    this.store.set(key, value);
  }

  reset(state: T): void {
    this.store.reset(state);
  }

  getState(): T {
    return this.store.getState();
  }

  clearAll(): void {
    this.store.clearAll();
  }

  getStorageInfo() {
    return this.store.getStorageInfo();
  }
}

import { Injectable } from '@angular/core';

import { BaseStoreService } from './base-store.service';
import {GlobalStoreState} from "@core/services/global-store/interfaces/global-store.interface";
import {GlobalStoreConfig} from "@core/services/global-store/global-store.service";

@Injectable({ providedIn: 'root' })
export class GlobalSharedService extends BaseStoreService<GlobalStoreState> {
  constructor() {
    const initialState: GlobalStoreState = {
      dataArray: [],
      dataObject: null,
      dataString: '',
      dataNumber: undefined
    };

    const config: GlobalStoreConfig = {
      storageKey: 'APP_GLOBAL_STORE',
      maxStorageSize: 2 * 1024 * 1024,
      enableLogging: true,
      sensitiveFields: [],
    };

    super(initialState, config);
  }

  setDataString<T extends string>(name: any, value: T): void {
    this.setValue(name, value);
  }

  getDataString(name: any): string | null {
    return this.getValue(name) as string | null;
  }

  setDataNumber<T extends number>(name: any, value: T): void {
    this.setValue(name, value);
  }

  getDataNumber(name: any): number | null {
    return this.getValue(name) as number | null;
  }

  setDataArray<T extends Array<any>>(name: any, value: T): void {
    this.setValue(name, value);
  }

  getDataArray<T>(name: any): T {
    return this.getValue(name) as T;
  }

  setDataObject<T extends object>(name: any, value: T): void {
    this.setValue(name, value);
  }

  getDataObject<T extends object>(name: any): T {
    return this.getValue(name) as T;
  }

  clear() {
    this.clearAll();
  }
}

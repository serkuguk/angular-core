import {InjectionToken} from '@angular/core';

export const AUTH_UNAUTHORIZED = new InjectionToken<() => void>('AUTH_UNAUTHORIZED');

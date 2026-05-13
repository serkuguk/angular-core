import { InjectionToken } from '@angular/core';
import { AuthRefreshPort } from '../interfaces/auth-refresh-port.interface';

export const AUTH_REFRESH_PORT = new InjectionToken<AuthRefreshPort>('AUTH_REFRESH_PORT');

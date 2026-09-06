import {inject} from '@angular/core';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, shareReplay, switchMap, throwError} from 'rxjs';
import {AuthTokenStorageService} from '../services/auth-token-storage.service';
import {AuthService, AuthRefreshResponse} from '@core/services/auth/auth.service';
import {ENV} from '@core/tokens/environment.token';
import {EnvironmentInterface} from '@core/interfaces/environment.interface';

let refreshInFlight$: Observable<AuthRefreshResponse> | null = null;

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authToken = inject(AuthTokenStorageService);
  const authService = inject(AuthService);
  const env = inject<EnvironmentInterface>(ENV);

  if (!isTrustedApiRequest(req.url, env.server_url) || isAuthRequest(req.url, env.server_url)) {
    return next(req);
  }

  const token = authToken.getToken('access_token');
  if (!token) return next(req);

  return next(addToken(req, token)).pipe(
    catchError(error => {
      if (error.status === 401) {
        authToken.logOut();
      }

      return error.status === 403
        ? refreshAccessToken(authService).pipe(switchMap(({access_token}) => next(addToken(req, access_token))))
        : throwError(() => error);
    }),
  );
};

function refreshAccessToken(authService: AuthService): Observable<AuthRefreshResponse> {
  if (!refreshInFlight$) {
    refreshInFlight$ = authService.refreshAccessToken().pipe(
      finalize(() => refreshInFlight$ = null),
      shareReplay({bufferSize: 1, refCount: true}),
    );
  }

  return refreshInFlight$;
}

function isTrustedApiRequest(requestUrl: string, serverUrl: string): boolean {
  try {
    const apiUrl = new URL(serverUrl);
    const url = new URL(requestUrl);
    const basePath = apiUrl.pathname.replace(/\/$/, '');
    return url.origin === apiUrl.origin && (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`));
  } catch {
    return false;
  }
}

function isAuthRequest(requestUrl: string, serverUrl: string): boolean {
  try {
    const apiUrl = new URL(serverUrl);
    const url = new URL(requestUrl);
    const basePath = apiUrl.pathname.replace(/\/$/, '');
    return url.origin === apiUrl.origin && [
      `${basePath}/auth/signin`,
      `${basePath}/auth/refresh_token`,
    ].includes(url.pathname);
  } catch {
    return false;
  }
}

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
}

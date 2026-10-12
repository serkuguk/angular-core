import {inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, defer, EMPTY, switchMap, takeUntil, throwError} from 'rxjs';
import {AuthTokenStorageService} from '@core/services/auth-token-storage.service';
import {AuthService} from '@core/services/auth/auth.service';
import {ENV} from '@core/tokens/environment.token';
import {EnvironmentInterface} from '@core/interfaces/environment.interface';
import {Router} from '@angular/router';
import {AUTH_UNAUTHORIZED} from '@core/tokens/auth-unauthorized.token';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authToken = inject(AuthTokenStorageService);
  const authService = inject(AuthService);
  const env = inject<EnvironmentInterface>(ENV);
  const router = inject(Router, {optional: true});
  const notifyUnauthorized = inject(AUTH_UNAUTHORIZED, {optional: true});
  const baseUrl = inject(DOCUMENT).baseURI;

  if (!isTrustedApiRequest(req.url, env.server_url, baseUrl) || isAuthRequest(req.url, env.server_url, baseUrl)) {
    return next(req);
  }

  const token = authToken.getToken('access_token');
  if (!token) return next(req);
  const sessionVersion = authService.sessionVersion;

  return next(addToken(req, token)).pipe(
    takeUntil(authService.sessionChanges$),
    catchError(error => defer(() => {
      if (sessionVersion !== authService.sessionVersion) return EMPTY;
      if (error.status === 401) {
        endUnauthorizedSession(authService, notifyUnauthorized, router);
      }

      return error.status === 403
        ? authService.refreshAccessToken().pipe(
          catchError(refreshError => defer(() => {
            if (sessionVersion === authService.sessionVersion && (refreshError.status === 401 || refreshError.status === 403)) {
              endUnauthorizedSession(authService, notifyUnauthorized, router);
            }
            return throwError(() => refreshError);
          })),
          switchMap(({access_token}) => sessionVersion === authService.sessionVersion
            ? next(addToken(req, access_token)).pipe(
              takeUntil(authService.sessionChanges$),
              catchError(retryError => defer(() => {
                if (retryError.status === 401) endUnauthorizedSession(authService, notifyUnauthorized, router);
                return throwError(() => retryError);
              })),
            )
            : EMPTY),
        )
        : throwError(() => error);
    })),
  );
};

function endUnauthorizedSession(
  authService: AuthService,
  notifyUnauthorized: (() => void) | null | undefined,
  router: Router | null | undefined,
): void {
  authService.clearSession();
  notifyUnauthorized?.();
  void router?.navigate(['/login']);
}

function isTrustedApiRequest(requestUrl: string, serverUrl: string, baseUrl: string): boolean {
  try {
    const apiUrl = new URL(serverUrl, baseUrl);
    const url = new URL(requestUrl, baseUrl);
    const basePath = apiUrl.pathname.replace(/\/$/, '');
    return url.origin === apiUrl.origin && (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`));
  } catch {
    return false;
  }
}

function isAuthRequest(requestUrl: string, serverUrl: string, baseUrl: string): boolean {
  try {
    const apiUrl = new URL(serverUrl, baseUrl);
    const url = new URL(requestUrl, baseUrl);
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

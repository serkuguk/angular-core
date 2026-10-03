import {DOCUMENT} from '@angular/common';
import {HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';
import {AuthTokenStorageService} from '@core/services/auth-token-storage.service';
import {ENV} from '@core/tokens/environment.token';
import {AUTH_UNAUTHORIZED} from '@core/tokens/auth-unauthorized.token';
import {authInterceptor} from './auth.interceptor';

const api = 'https://api.example.test/api';
const refreshed = {access_token: 'new-token', refresh_token: 'new-refresh'};

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authService: AuthService;
  let storage: {getToken: jest.Mock; setToken: jest.Mock; refreshToken: jest.Mock; logOut: jest.Mock};
  let notifyUnauthorized: jest.Mock;
  let router: {navigate: jest.Mock};
  let env: {server_url: string};

  beforeEach(() => {
    storage = {
      getToken: jest.fn(key => key === 'access_token' ? 'access-token' : 'refresh-token'),
      setToken: jest.fn(), refreshToken: jest.fn(), logOut: jest.fn(),
    };
    notifyUnauthorized = jest.fn();
    router = {navigate: jest.fn().mockResolvedValue(true)};
    env = {server_url: api};
    TestBed.configureTestingModule({providers: [
      provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting(), AuthService,
      {provide: ENV, useValue: env},
      {provide: AuthTokenStorageService, useValue: storage},
      {provide: AUTH_UNAUTHORIZED, useValue: notifyUnauthorized},
      {provide: Router, useValue: router},
      {provide: DOCUMENT, useValue: {baseURI: 'https://app.example.test/'}},
    ]});
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => httpMock.verify());

  it('adds credentials only to the configured origin and path', () => {
    for (const url of [`${api}/secure`, 'https://other.example.test/api/secure', '/assets/logo.svg', `${api}-lookalike/secure`]) {
      http.get(url).subscribe();
      const request = httpMock.expectOne(url);
      expect(request.request.headers.get('Authorization')).toBe(url === `${api}/secure` ? 'Bearer access-token' : null);
      request.flush({});
    }
  });

  it('resolves a relative API against the document origin and excludes auth endpoints', () => {
    env.server_url = '/api';
    for (const url of ['/api/secure', 'https://app.example.test/api/secure', '//other.example.test/api/secure', '/assets/logo.svg', '/api-lookalike/secure', '/api/auth/signin', '/api/auth/refresh_token']) {
      http.post(url, {}).subscribe();
      const request = httpMock.expectOne(url);
      expect(request.request.headers.get('Authorization')).toBe(url.endsWith('/api/secure') && !url.includes('other') ? 'Bearer access-token' : null);
      request.flush({});
    }
  });

  it('does not attach credentials to absolute sign-in or refresh requests', () => {
    for (const endpoint of ['signin', 'refresh_token']) {
      http.post(`${api}/auth/${endpoint}`, {}).subscribe();
      const request = httpMock.expectOne(`${api}/auth/${endpoint}`);
      expect(request.request.headers.has('Authorization')).toBe(false);
      request.flush({});
    }
  });

  it('shares one refresh, retries concurrent POSTs once, and never replays them on a later refresh', () => {
    const resolved: string[] = [];
    for (const endpoint of ['a', 'b']) {
      http.post<{ok: string}>(`${api}/${endpoint}`, {id: endpoint}).subscribe(response => resolved.push(response.ok));
      httpMock.expectOne(`${api}/${endpoint}`).flush({}, {status: 403, statusText: 'Forbidden'});
    }
    httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    for (const endpoint of ['a', 'b']) {
      const retry = httpMock.expectOne(`${api}/${endpoint}`);
      expect(retry.request.method).toBe('POST');
      expect(retry.request.body).toEqual({id: endpoint});
      expect(retry.request.headers.get('Authorization')).toBe('Bearer new-token');
      retry.flush({ok: endpoint});
    }
    http.get(`${api}/later`).subscribe();
    httpMock.expectOne(`${api}/later`).flush({}, {status: 403, statusText: 'Forbidden'});
    httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    httpMock.expectOne(`${api}/later`).flush({});
    expect(resolved).toEqual(['a', 'b']);
    httpMock.expectNone(`${api}/a`);
    httpMock.expectNone(`${api}/b`);
  });

  it('does not retry a cancelled waiter while another request finishes its refresh', () => {
    const cancelled = http.post(`${api}/cancelled`, {}).subscribe();
    httpMock.expectOne(`${api}/cancelled`).flush({}, {status: 403, statusText: 'Forbidden'});
    http.get(`${api}/active`).subscribe();
    httpMock.expectOne(`${api}/active`).flush({}, {status: 403, statusText: 'Forbidden'});
    const refresh = httpMock.expectOne(`${api}/auth/refresh_token`);
    cancelled.unsubscribe();
    refresh.flush(refreshed);
    httpMock.expectNone(`${api}/cancelled`);
    httpMock.expectOne(`${api}/active`).flush({});
  });

  it('cancels the refresh when its last waiter leaves and permits a new refresh', () => {
    const subscription = http.get(`${api}/cancelled`).subscribe();
    httpMock.expectOne(`${api}/cancelled`).flush({}, {status: 403, statusText: 'Forbidden'});
    const refresh = httpMock.expectOne(`${api}/auth/refresh_token`);
    subscription.unsubscribe();
    expect(refresh.cancelled).toBe(true);
    http.get(`${api}/later`).subscribe();
    httpMock.expectOne(`${api}/later`).flush({}, {status: 403, statusText: 'Forbidden'});
    httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    httpMock.expectOne(`${api}/later`).flush({});
  });

  it.each([401, 403])('ends the session on refresh %s and preserves the transport error instance', status => {
    const failure = new HttpErrorResponse({status, error: {message: 'expired'}});
    jest.spyOn(authService, 'refreshAccessToken').mockReturnValue(throwError(() => failure));
    let received: unknown;
    http.get(`${api}/expired`).subscribe({error: error => received = error});
    httpMock.expectOne(`${api}/expired`).flush({}, {status: 403, statusText: 'Forbidden'});
    expect(received).toBe(failure);
    expect(storage.logOut).toHaveBeenCalledTimes(1);
    expect(notifyUnauthorized).toHaveBeenCalledTimes(1);
  });

  it.each([0, 500])('preserves the session on refresh failure %s and resets the shared refresh', status => {
    let received: HttpErrorResponse | undefined;
    http.get(`${api}/first`).subscribe({error: error => received = error});
    httpMock.expectOne(`${api}/first`).flush({}, {status: 403, statusText: 'Forbidden'});
    const refresh = httpMock.expectOne(`${api}/auth/refresh_token`);
    if (status === 0) refresh.error(new ProgressEvent('error'));
    else refresh.flush({message: 'unavailable'}, {status, statusText: 'Server Error'});
    expect(received).toBeInstanceOf(HttpErrorResponse);
    expect(received?.status).toBe(status);
    expect(storage.logOut).not.toHaveBeenCalled();
    expect(notifyUnauthorized).not.toHaveBeenCalled();
    http.get(`${api}/later`).subscribe();
    httpMock.expectOne(`${api}/later`).flush({}, {status: 403, statusText: 'Forbidden'});
    httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    httpMock.expectOne(`${api}/later`).flush({});
  });

  it('notifies unauthorized once when a shared refresh fails for concurrent requests', () => {
    const errors: HttpErrorResponse[] = [];
    for (const endpoint of ['a', 'b']) {
      http.get(`${api}/${endpoint}`).subscribe({error: error => errors.push(error)});
      httpMock.expectOne(`${api}/${endpoint}`).flush({}, {status: 403, statusText: 'Forbidden'});
    }
    httpMock.expectOne(`${api}/auth/refresh_token`).flush({}, {status: 401, statusText: 'Unauthorized'});
    expect(storage.logOut).toHaveBeenCalledTimes(1);
    expect(notifyUnauthorized).toHaveBeenCalledTimes(1);
    expect(errors).toHaveLength(2);
    expect(errors[0]).toBe(errors[1]);
  });

  it.each([0, 403, 500])('does not refresh again or end the session when retry fails with %s', status => {
    let received: HttpErrorResponse | undefined;
    http.get(`${api}/expired`).subscribe({error: error => received = error});
    httpMock.expectOne(`${api}/expired`).flush({}, {status: 403, statusText: 'Forbidden'});
    httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    const retry = httpMock.expectOne(`${api}/expired`);
    if (status === 0) retry.error(new ProgressEvent('error'));
    else retry.flush({message: 'failed'}, {status, statusText: 'Error'});
    expect(received).toBeInstanceOf(HttpErrorResponse);
    expect(received?.status).toBe(status);
    expect(storage.logOut).not.toHaveBeenCalled();
    expect(notifyUnauthorized).not.toHaveBeenCalled();
    httpMock.expectNone(`${api}/auth/refresh_token`);
  });

  it.each([false, true])('ends the session on an initial or retried 401 (retried: %s)', retried => {
    let received: HttpErrorResponse | undefined;
    http.get(`${api}/unauthorized`).subscribe({error: error => received = error});
    if (retried) {
      httpMock.expectOne(`${api}/unauthorized`).flush({}, {status: 403, statusText: 'Forbidden'});
      httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    }
    httpMock.expectOne(`${api}/unauthorized`).flush({}, {status: 401, statusText: 'Unauthorized'});
    expect(received?.status).toBe(401);
    expect(storage.logOut).toHaveBeenCalledTimes(1);
    expect(notifyUnauthorized).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it.each(['logout', '401', 'replacement'])('cancels waiting requests when the session changes through %s', action => {
    const completed = jest.fn();
    http.get(`${api}/waiting`).subscribe({complete: completed});
    httpMock.expectOne(`${api}/waiting`).flush({}, {status: 403, statusText: 'Forbidden'});
    const refresh = httpMock.expectOne(`${api}/auth/refresh_token`);
    if (action === '401') {
      http.get(`${api}/unauthorized`).subscribe({error: () => undefined});
      httpMock.expectOne(`${api}/unauthorized`).flush({}, {status: 401, statusText: 'Unauthorized'});
    } else if (action === 'replacement') authService.saveToken(refreshed);
    else {
      authService.logout().subscribe();
      httpMock.expectOne(`${api}/auth/signout`).flush({});
    }
    expect(refresh.cancelled).toBe(true);
    expect(completed).toHaveBeenCalledTimes(1);
    httpMock.expectNone(`${api}/waiting`);
    expect(storage.setToken).toHaveBeenCalledTimes(action === 'replacement' ? 1 : 0);
  });

  it('cancels an in-flight retry on logout', () => {
    http.get(`${api}/retry`).subscribe();
    httpMock.expectOne(`${api}/retry`).flush({}, {status: 403, statusText: 'Forbidden'});
    httpMock.expectOne(`${api}/auth/refresh_token`).flush(refreshed);
    const retry = httpMock.expectOne(`${api}/retry`);
    authService.clearSession();
    expect(retry.cancelled).toBe(true);
  });

  it.each(['logout', 'replacement'])('cancels an initial authenticated request on %s without emitting stale user data', action => {
    const next = jest.fn();
    const error = jest.fn();
    const complete = jest.fn();
    http.get(`${api}/old-session`).subscribe({next, error, complete});
    const oldRequest = httpMock.expectOne(`${api}/old-session`);
    if (action === 'replacement') authService.saveToken(refreshed);
    else authService.clearSession();
    expect(oldRequest.cancelled).toBe(true);
    expect(() => oldRequest.flush({username: 'old-user'})).toThrow('Cannot flush a cancelled request');
    expect(next).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledTimes(1);
    expect(notifyUnauthorized).not.toHaveBeenCalled();
  });
});

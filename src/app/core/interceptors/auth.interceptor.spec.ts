import {HttpClient, provideHttpClient, withInterceptors} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {of, Subject, throwError} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';
import {AuthTokenStorageService} from '@core/services/auth-token-storage.service';
import {ENV} from '@core/tokens/environment.token';
import {authInterceptor} from './auth.interceptor';

type AuthRefreshResponse = { access_token: string; refresh_token: string };
const api = 'https://api.example.test/api';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let storage: jest.Mocked<Pick<AuthTokenStorageService, 'getToken' | 'logOut'>>;
  let authService: jest.Mocked<Pick<AuthService, 'refreshAccessToken'>>;

  beforeEach(() => {
    storage = {getToken: jest.fn().mockReturnValue('access-token'), logOut: jest.fn()};
    authService = {refreshAccessToken: jest.fn()};

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {provide: ENV, useValue: {server_url: api}},
        {provide: AuthTokenStorageService, useValue: storage},
        {provide: AuthService, useValue: authService},
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('adds credentials only to the configured API scope', () => {
    http.get(`${api}/secure`).subscribe();
    http.get('https://other.example.test/api/secure').subscribe();
    http.get('/assets/logo.svg').subscribe();

    expect(httpMock.expectOne(`${api}/secure`).request.headers.get('Authorization')).toBe('Bearer access-token');
    expect(httpMock.expectOne('https://other.example.test/api/secure').request.headers.has('Authorization')).toBe(false);
    expect(httpMock.expectOne('/assets/logo.svg').request.headers.has('Authorization')).toBe(false);
    httpMock.match(() => true).forEach(request => request.flush({}));
  });

  it('does not attach credentials to sign-in or refresh requests', () => {
    http.post(`${api}/auth/signin`, {}).subscribe();
    http.post(`${api}/auth/refresh_token`, {}).subscribe();

    expect(httpMock.expectOne(`${api}/auth/signin`).request.headers.has('Authorization')).toBe(false);
    expect(httpMock.expectOne(`${api}/auth/refresh_token`).request.headers.has('Authorization')).toBe(false);
    httpMock.match(() => true).forEach(request => request.flush({}));
  });

  it('shares one refresh and retries each concurrent request once with the fresh token', () => {
    const refresh$ = new Subject<AuthRefreshResponse>();
    authService.refreshAccessToken.mockReturnValue(refresh$.asObservable());
    const resolved: string[] = [];

    http.get<{ok: string}>(`${api}/secure-a`).subscribe(response => resolved.push(response.ok));
    http.get<{ok: string}>(`${api}/secure-b`).subscribe(response => resolved.push(response.ok));
    httpMock.expectOne(`${api}/secure-a`).flush({}, {status: 403, statusText: 'Forbidden'});
    httpMock.expectOne(`${api}/secure-b`).flush({}, {status: 403, statusText: 'Forbidden'});

    expect(authService.refreshAccessToken).toHaveBeenCalledTimes(1);
    refresh$.next({access_token: 'new-token', refresh_token: 'new-refresh'});
    refresh$.complete();

    const retried = httpMock.match(request => request.url.endsWith('/secure-a') || request.url.endsWith('/secure-b'));
    expect(retried).toHaveLength(2);
    retried.forEach(request => {
      expect(request.request.headers.get('Authorization')).toBe('Bearer new-token');
      request.flush({ok: request.request.url.endsWith('a') ? 'a' : 'b'});
    });
    expect(resolved).toEqual(expect.arrayContaining(['a', 'b']));
  });

  it('clears the shared refresh after an error so a later request can refresh', () => {
    authService.refreshAccessToken
      .mockReturnValueOnce(throwError(() => new Error('refresh failed')))
      .mockReturnValueOnce(of({access_token: 'new-token', refresh_token: 'new-refresh'}));

    http.get(`${api}/first`).subscribe({error: () => undefined});
    httpMock.expectOne(`${api}/first`).flush({}, {status: 403, statusText: 'Forbidden'});

    http.get(`${api}/second`).subscribe();
    httpMock.expectOne(`${api}/second`).flush({}, {status: 403, statusText: 'Forbidden'});
    expect(authService.refreshAccessToken).toHaveBeenCalledTimes(2);
    httpMock.expectOne(`${api}/second`).flush({});
  });
});

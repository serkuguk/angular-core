import {TestBed} from '@angular/core/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthTokenStorageService} from './auth-token-storage.service';

describe('AuthTokenStorageService', () => {
  let service: AuthTokenStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthTokenStorageService,
        {provide: JwtHelperService, useValue: new JwtHelperService()},
      ],
    });
    service = TestBed.inject(AuthTokenStorageService);
  });

  it('removes only the credentials it owns on logout', () => {
    localStorage.setItem('access_token', 'access');
    localStorage.setItem('refresh_token', 'refresh');
    localStorage.setItem('foreign-preference', 'keep');

    service.logOut();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(localStorage.getItem('foreign-preference')).toBe('keep');
  });

  it.each(['broken-token', 'a.b.c', 'e30.bnVsbA.signature', 'e30.!!.signature'])('treats a malformed JWT %s as unauthenticated and removes only auth keys', token => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', 'refresh');
    localStorage.setItem('foreign-preference', 'keep');

    expect(service.isAuthenticate()).toBe(false);
    expect(service.decodeToken()).toBeNull();
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
    expect(localStorage.getItem('foreign-preference')).toBe('keep');
  });

  it('decodes a valid unexpired JWT', () => {
    const payload = {username: 'demo', role: 'admin', exp: Math.floor(Date.now() / 1000) + 3600};
    localStorage.setItem('access_token', `e30.${btoa(JSON.stringify(payload))}.signature`);
    expect(service.isAuthenticate()).toBe(true);
    expect(service.decodeToken()).toEqual(payload);
  });

  it('returns null when decoding a corrupt JWT directly', () => {
    localStorage.setItem('access_token', 'broken');
    localStorage.setItem('refresh_token', 'refresh');
    expect(service.decodeToken()).toBeNull();
    expect(localStorage.getItem('refresh_token')).toBeNull();
  });

  it.each([42, 'text', []])('rejects a non-object JWT payload %p', payload => {
    localStorage.setItem('access_token', `e30.${btoa(JSON.stringify(payload))}.signature`);
    expect(service.isAuthenticate()).toBe(false);
    expect(localStorage.getItem('access_token')).toBeNull();
  });
});

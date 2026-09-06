import {TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthTokenStorageService} from './auth-token-storage.service';

describe('AuthTokenStorageService', () => {
  let service: AuthTokenStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthTokenStorageService,
        {provide: JwtHelperService, useValue: {isTokenExpired: jest.fn(), decodeToken: jest.fn()}},
        provideRouter([]),
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
});

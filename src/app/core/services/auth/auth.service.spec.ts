import { HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { EnvironmentInterface } from "@core/interfaces/environment.interface";
import { LoginRequestInterface } from "@core/interfaces/auth/login-request.interface";
import { AuthTokenStorageService } from "@core/services/auth-token-storage.service";
import { ENV } from "@core/tokens/environment.token";
import { AuthService } from "./auth.service";
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let storage: jest.Mocked<AuthTokenStorageService>;
  const env: EnvironmentInterface = {
    production: false,
    token_header_key: "Authorization",
    server_url: "http://api.test",
  };

  beforeEach(() => {
    storage = {
      setToken: jest.fn(),
      refreshToken: jest.fn(),
      getToken: jest.fn(),
      decodeToken: jest.fn(),
      logOut: jest.fn(),
      isAuthenticate: jest.fn(),
    } as unknown as jest.Mocked<AuthTokenStorageService>;

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        { provide: ENV, useValue: env },
        { provide: AuthTokenStorageService, useValue: storage },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("logs in and stores tokens, returning decoded user", (done) => {
    const credentials: LoginRequestInterface = { username: "demo", password: "secret" };
    storage.decodeToken.mockReturnValue({ username: "demo", role: "admin" });

    service.login(credentials).subscribe((user) => {
      expect(user).toEqual({ username: "demo", role: "admin" });
      expect(storage.setToken).toHaveBeenCalledWith("access");
      expect(storage.refreshToken).toHaveBeenCalledWith("refresh");
      done();
    });

    const req = httpMock.expectOne(`${env.server_url}/auth/signin`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(credentials);
    req.flush({ access_token: "access", refresh_token: "refresh" });
  });

  it("logs out, clears tokens, and calls storage logout", (done) => {
    (service as any).saveToken({ access_token: "old", refresh_token: "old-refresh" });

    service.logout().subscribe(() => {
      expect(storage.logOut).toHaveBeenCalled();
      done();
    });

    const req = httpMock.expectOne(`${env.server_url}/auth/signout`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toBeNull();
    req.flush({});
  });

  it("reads the current persisted refresh token and saves new credentials", () => {
    storage.getToken.mockReturnValue("stored-refresh");

    service.refreshAccessToken().subscribe();

    const req = httpMock.expectOne(`${env.server_url}/auth/refresh_token`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({ refresh_token: "stored-refresh" });

    req.flush({ access_token: "new-access", refresh_token: "new-refresh" });
    expect(storage.setToken).toHaveBeenCalledWith("new-access");
    expect(storage.refreshToken).toHaveBeenCalledWith("new-refresh");
  });

  it("uses the persisted refresh token in a fresh service", () => {
    storage.getToken.mockReturnValue("persisted-refresh");

    service.refreshAccessToken().subscribe();

    const req = httpMock.expectOne(`${env.server_url}/auth/refresh_token`);
    expect(req.request.body).toEqual({ refresh_token: "persisted-refresh" });
    req.flush({ access_token: "new-access", refresh_token: "new-refresh" });
  });

  it("preserves refresh transport errors for the interceptor to handle", (done) => {
    (service as any).saveToken({ access_token: "old", refresh_token: "bad-refresh" });
    jest.clearAllMocks();

    service.refreshAccessToken().subscribe({
      next: () => done.fail("expected error"),
      error: (error) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
        expect(error.status).toBe(401);
        expect(error.error).toBe('unauthorized');
        expect(storage.logOut).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpMock.expectOne(`${env.server_url}/auth/refresh_token`);
    req.flush("unauthorized", { status: 401, statusText: "Unauthorized" });
  });

  it.each(['logout', 'replacement', 'new-login'])('cancels a pending login on %s without emitting user or error', action => {
    const next = jest.fn();
    const error = jest.fn();
    const complete = jest.fn();
    service.login({username: 'old', password: 'secret'}).subscribe({next, error, complete});
    const login = httpMock.expectOne(`${env.server_url}/auth/signin`);

    if (action === 'replacement') service.saveToken({access_token: 'replacement', refresh_token: 'replacement-refresh'});
    else if (action === 'new-login') {
      storage.decodeToken.mockReturnValue({username: 'new', role: 'admin'});
      service.login({username: 'new', password: 'secret'}).subscribe();
      httpMock.expectOne(`${env.server_url}/auth/signin`).flush({access_token: 'new', refresh_token: 'new-refresh'});
    } else service.clearSession();

    expect(login.cancelled).toBe(true);
    expect(next).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(complete).toHaveBeenCalledTimes(1);
    expect(storage.setToken).toHaveBeenCalledTimes(action === 'logout' ? 0 : 1);
  });
});

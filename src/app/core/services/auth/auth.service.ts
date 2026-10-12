import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { defer, finalize, Observable, of, shareReplay, Subject, takeUntil, tap } from "rxjs";
import { map } from "rxjs/operators";
import { ApiBaseService } from "@core/services/api-base.service";
import { AuthTokenStorageService } from "@core/services/auth-token-storage.service";
import { EnvironmentInterface } from "@core/interfaces/environment.interface";
import { LoginRequestInterface } from "@core/interfaces/auth/login-request.interface";
import { ENV } from "@core/tokens/environment.token";
import { User } from '@core/models/backend/user';

export interface AuthRefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthSession {
  authenticated: boolean;
  user: User | null;
}

@Injectable()
export class AuthService extends ApiBaseService {
  private http: HttpClient = inject(HttpClient);
  private authTokenStorageService: AuthTokenStorageService = inject(AuthTokenStorageService);
  private env = inject<EnvironmentInterface>(ENV);

  private generation = 0;
  private readonly sessionChanged = new Subject<void>();
  public readonly sessionChanges$ = this.sessionChanged.asObservable();
  private refreshInFlight$: Observable<AuthRefreshResponse> | null = null;

  public get sessionVersion(): number {
    return this.generation;
  }

  public login(user: LoginRequestInterface): Observable<any> {
    return defer(() => {
      this.invalidateSession();
      return this.http.post<AuthRefreshResponse>(`${this.env.server_url}/auth/signin`, user).pipe(
        takeUntil(this.sessionChanges$),
        tap(res => this.storeTokens(res)),
        map(() => this.getUser()),
      );
    });
  }

  public logout(): Observable<any> {
    return defer(() => {
      this.clearSession();
      return this.http.post(`${this.env.server_url}/auth/signout`, null);
    });
  }

  public refreshAccessToken(): Observable<AuthRefreshResponse> {
    if (!this.refreshInFlight$) {
      const refresh$ = defer(() => this.http.post<AuthRefreshResponse>(`${this.env.server_url}/auth/refresh_token`, {
        refresh_token: this.authTokenStorageService.getToken('refresh_token'),
      })).pipe(
        takeUntil(this.sessionChanges$),
        tap(res => this.storeTokens(res)),
        finalize(() => {
          if (this.refreshInFlight$ === refresh$) this.refreshInFlight$ = null;
        }),
        shareReplay({bufferSize: 1, refCount: true}),
      );
      this.refreshInFlight$ = refresh$;
    }
    return this.refreshInFlight$;
  }

  public init(): Observable<AuthSession> {
    if (!this.authTokenStorageService.isAuthenticate()) {
      this.clearSession();
      return of({ authenticated: false, user: null });
    }

    const user = this.getStoredUser();
    if (!user) {
      this.clearSession();
      return of({ authenticated: false, user: null });
    }

    return of({ authenticated: true, user });
  }

  public getUser(): { username: string; role: string } | null {
    const decodedToken = this.authTokenStorageService.decodeToken();
    return decodedToken ? { username: decodedToken.username, role: decodedToken.role } : null;
  }

  private getStoredUser(): User | null {
    const decodedToken = this.authTokenStorageService.decodeToken();
    const accessToken = this.authTokenStorageService.getToken('access_token');
    return decodedToken && accessToken ? {
      username: decodedToken.username,
      roleId: decodedToken.roleId ?? decodedToken.role ?? '',
      access_token: accessToken,
      role: decodedToken.role,
    } : null;
  }

  public get isAuth(): boolean {
    if (!this.authTokenStorageService.isAuthenticate()) {
      this.clearSession();
      return false;
    }
    return true;
  }

  public userUpdate(credentials: any): Observable<any> {
    return of([]);
  }

  public saveToken(res: AuthRefreshResponse): void {
    this.invalidateSession();
    this.storeTokens(res);
  }

  private storeTokens(res: AuthRefreshResponse): void {
    this.authTokenStorageService.setToken(res.access_token);
    this.authTokenStorageService.refreshToken(res.refresh_token);
  }

  public clearSession(): void {
    this.invalidateSession();
    this.authTokenStorageService.logOut();
  }

  private invalidateSession(): void {
    this.generation++;
    this.refreshInFlight$ = null;
    this.sessionChanged.next();
  }
}

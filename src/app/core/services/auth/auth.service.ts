import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { catchError, defer, finalize, Observable, of, tap } from "rxjs";
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

  private token: string | null = null;

  public login(user: LoginRequestInterface): Observable<any> {
    return this.http.post<{ username: string; password: string }>(`${this.env.server_url}/auth/signin`, user).pipe(
      tap((res: any) => {
        this.saveToken(res);
      }),
      map(() => this.getUser()),
    );
  }

  public logout(): Observable<any> {
    return defer(() => {
      this.clearSession();
      return this.http.post(`${this.env.server_url}/auth/signout`, null);
    });
  }

  public refreshAccessToken(): Observable<AuthRefreshResponse> {
    return this.http.post<AuthRefreshResponse>(`${this.env.server_url}/auth/refresh_token`, {
      refresh_token: this.authTokenStorageService.getToken('refresh_token'),
    }).pipe(
      tap((res: AuthRefreshResponse) => this.saveToken(res)),
      catchError((err) => {
        this.clearSession();
        return this.handleError(err, {});
      }),
      finalize(() => of([])),
    );
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

    this.token = this.authTokenStorageService.getToken('access_token');
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
    this.token = this.authTokenStorageService.getToken("access_token");
    return true;
  }

  public userUpdate(credentials: any): Observable<any> {
    return of([]);
  }

  public saveToken(res: AuthRefreshResponse): void {
    this.token = res.access_token;
    this.authTokenStorageService.setToken(this.token);
    this.authTokenStorageService.refreshToken(res.refresh_token);
  }

  public clearSession(): void {
    this.token = null;
    this.authTokenStorageService.logOut();
  }
}

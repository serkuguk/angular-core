import {HttpClient} from "@angular/common/http";
import {Injectable, inject} from "@angular/core";
import {catchError, Observable, of, tap, throwError} from "rxjs";
import {LoginRequestInterface} from "../types/login-request_interface";
import {AuthTokenStorageService} from "@core/services/auth-token-storage.service";
import {map} from "rxjs/operators";
import {ENV} from "@core/tokens/environment.token";
import {EnvironmentInterface} from "@core/interfaces/environment.interface";

@Injectable()
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private authTokenStorageService: AuthTokenStorageService = inject(AuthTokenStorageService);
  private env = inject<EnvironmentInterface>(ENV);

  private token: string | null = null;
  private refreshToken: string | null = null;

  public login(user: LoginRequestInterface): Observable<any> {
    return this.http.post<{username: string, password: string}>(`${this.env.server_url}/auth/signin`, user).pipe(
      tap((res: any) => {
        this.saveToken(res)
      }),
      map(_ => this.getUser())
    )
  }

  public logout(): Observable<any> {
    return this.http.post(`${this.env.server_url}/auth/signout`, null).pipe(
      tap(_ => {
        this.token = null;
        this.refreshToken = null
        this.authTokenStorageService.logOut()
      })
    )
  }

  public refreshAccessToken(): Observable<any> {
    return this.http.post(`${this.env.server_url}/auth/refresh_token`,
      {refresh_token: this.refreshToken})
      .pipe(
        tap((res: any) => this.saveToken(res)),
        catchError(err => {
          this.token = null;
          this.authTokenStorageService.logOut()
          return throwError(err);
        })
      )
  }

  public init(): Observable<boolean> {
    return of(this.isAuth)
  }

  public getUser(): any {
     let decodedToken = this.authTokenStorageService.decodeToken();
     return {username: decodedToken.username, role: decodedToken.role};
  }

  public get isAuth(): boolean {
    if (!this.token)
      this.token = this.authTokenStorageService.getToken('access_token');

    return !!this.token;
  }

  public userUpdate(credentials: any):  Observable<any> {
    return of([])
  }

  public saveToken(res: any): void {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;
    this.authTokenStorageService.setToken(this.token);
    this.authTokenStorageService.refreshToken(this.refreshToken);
  }
}

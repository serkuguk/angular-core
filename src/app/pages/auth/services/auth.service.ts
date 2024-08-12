import {HttpClient} from "@angular/common/http";
import {Injectable, inject} from "@angular/core";
import {Observable, tap} from "rxjs";
import {environment} from "src/environments/environment";
import {LoginRequestInterface} from "../types/login-request_interface";
import {AuthTokenStorageService} from "@core/services/auth/auth-token-storage.service";

@Injectable()
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private authTokenStorageService: AuthTokenStorageService = inject(AuthTokenStorageService);
  //private links = @Inject('ENV') environment any;

  token: string | null = null;

  public login(user: LoginRequestInterface): Observable<any> {
    return this.http.post<{username: string, password: string}>(`${environment.server_url}/auth/signin`, user).pipe(
      tap((req: any) => {
        this.token = req.access_token;
        this.authTokenStorageService.setToken(req.access_token)
      })
    )
  }

  public logout(user: LoginRequestInterface): Observable<any> {
    return this.http.post<{username: string, password: string}>(`${environment.server_url}/auth/signout`, user).pipe(
      tap((req: any) => {
        this.token = null;
        this.authTokenStorageService.logOut()
      })
    )
  }
}

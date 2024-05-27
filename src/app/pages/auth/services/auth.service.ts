import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, Subject, catchError, of, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginRequestInterface } from "../types/login-request_interface";

@Injectable()
export class AuthService {

  private http = inject(HttpClient);
  //private links = @Inject('ENV') environment any;

  public login(user: LoginRequestInterface): Observable<any> {
    return this.http.post(`${environment.server_url}/auth/signin`, user)
  }
}
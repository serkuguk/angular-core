import {inject, Injectable} from '@angular/core'
import {environment} from 'src/environments/environment'
import {Observable, of} from 'rxjs'
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthTokenStorageService {

  jwtHelper: JwtHelperService = inject(JwtHelperService);

  public setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  public refreshAuthToken(token: string): void {
    this.setToken(token);
  }

  isAuthenticate(): boolean {
    const token: string | null = localStorage.getItem('access_token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  public saveUser(user: any): void {

  }

  public getUser(): Observable<string[]> {
    return of([]);
  }

  public logOut(): void {
    localStorage.clear();
    window.location.reload();
  }
}

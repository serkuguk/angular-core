import {inject, Injectable} from '@angular/core'
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthTokenStorageService {

  private jwtHelper: JwtHelperService = inject(JwtHelperService);

  public setToken(token: string | null): void {
    if (typeof token === "string")
      localStorage.setItem('access_token', token);
  }

  public refreshToken(token: string | null): void {
    if (typeof token === "string")
      localStorage.setItem('refresh_token', token);
  }

  public getToken(token: string): string | null {
    return localStorage.getItem(token);
  }

  public isAuthenticate(): boolean {
    const token = this.getToken('access_token');
    try {
      return !!token && !!this.decodeToken() && !this.jwtHelper.isTokenExpired(token);
    } catch {
      this.logOut();
      return false;
    }
  }

  public decodeToken(): any | null {
    const token = this.getToken('access_token');
    if (!token) return null;
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      if (!decoded || typeof decoded !== 'object' || Array.isArray(decoded)) {
        this.logOut();
        return null;
      }
      return decoded;
    } catch {
      this.logOut();
      return null;
    }
  }

  public logOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

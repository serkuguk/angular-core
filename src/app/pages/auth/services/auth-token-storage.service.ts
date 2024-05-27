import {Injectable} from '@angular/core'
import {environment} from 'src/environments/environment'
import {Observable, of} from 'rxjs'

@Injectable()
export class AuthTokenStorageService {
  
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(environment.token_key);
    //const expDate = new Date(new Date().getTime() + +token.expiresIn * 1000);
    //localStorage.setItem('token-exp', expDate.toString());
    window.sessionStorage.setItem(environment.token_key, token);
  }

  public getToken(): any {
    /*const expDate = new Date(window.sessionStorage.getItem(environment.token_key));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }*/
    return window.sessionStorage.getItem(environment.token_key)
  }

  isAuthentificated(): boolean {
    return !!this.getToken();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(environment.user_key)
    window.sessionStorage.setItem(environment.user_key, JSON.stringify(user))
  }

  public getUser(): Observable<string[]> {
    return of([]);//JSON.parse(window.sessionStorage.getItem(environment.user_key));
  }

  public logOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
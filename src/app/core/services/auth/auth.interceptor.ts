import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'src/environments/environment';
import { AuthTokenStorageService } from './auth-token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authTokenStorage: AuthTokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const token = this.authTokenStorage.getToken();

    if (token) {
      request = req.clone({
        headers: req.headers.set(environment.token_header_key, `Bearer ${token}`)
      })
    }
    return next.handle(request)
  }
}
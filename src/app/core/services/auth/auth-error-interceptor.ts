import {inject} from '@angular/core'
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http'
import {catchError, throwError} from 'rxjs'

import { AuthTokenStorageService } from './auth-token-storage.service';

export const authErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

    const authToken: AuthTokenStorageService = inject(AuthTokenStorageService);

    return next(req).pipe(catchError(err => {
      if (err.status === 401) {
        authToken.logOut();
      }

      if (err.status === 403) {
        //authToken.refreshAuthToken();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
}

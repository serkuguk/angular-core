import {inject} from '@angular/core'
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http'
import {catchError, throwError} from 'rxjs'

import { AuthTokenStorageService } from './auth-token-storage.service';

export const authErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

    const authToken: AuthTokenStorageService = inject(AuthTokenStorageService);
    //private notivicationService: NotivicationService = inject(NotivicationService);

    return next(req).pipe(catchError(err => {
      if (err.status === 401) {
        authToken.logOut();
        window.location.reload();
      }

      const error = err.error.message || err.statusText;
      //this.notificationService.showSnackBar(error)
      return throwError(error);
    }))
  
}
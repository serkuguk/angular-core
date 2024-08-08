import {Injectable, inject} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, catchError, throwError} from 'rxjs'
import {environment} from 'src/environments/environment';
import { AuthTokenStorageService } from './auth-token-storage.service';

@Injectable()
export class AuthErrorInterceptorService implements HttpInterceptor{

  private authTokenStorage: AuthTokenStorageService = inject(AuthTokenStorageService);
  //private notivicationService: NotivicationService = inject(NotivicationService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 401) {
        this.authTokenStorage.logOut();
        window.location.reload();
      }

      const error = err.error.message || err.statusText;
      //this.notificationService.showSnackBar(error)
      return throwError(error);
    }))
  }
}
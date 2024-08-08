import {inject} from '@angular/core'
import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http'
import {AuthTokenStorageService} from './auth-token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authToken: AuthTokenStorageService = inject(AuthTokenStorageService).getToken();
  
    if (!authToken) return next(req);

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    })
    
    return next(req);
}
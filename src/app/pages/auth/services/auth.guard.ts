import {Injectable, inject} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthTokenStorageService} from './auth-token-storage.service';

@Injectable()
export class AuthGuard {

  private router: Router = inject(Router);
  private tokenStorageService: AuthTokenStorageService = inject(AuthTokenStorageService);

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
                const currentUser = this.tokenStorageService.getUser();
                if (currentUser) {
                  return true;
                }
                 
                this.router.navigate(['/login', {queryParams: {returnUrl: state.url}}]);
                return false;
              
  }
}

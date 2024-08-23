import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenStorageService } from 'src/app/core/services/auth/auth-token-storage.service';

export const authGuard = () => {
  const router: Router = inject(Router);
  const isAuthenticated: boolean = inject(AuthTokenStorageService).isAuthenticate();

  if (isAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/auth']);
}

import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthTokenStorageService } from 'src/app/core/services/auth/auth-token-storage.service';

export const authGuard = () => {
  const router: Router = inject(Router);
  const isAuthentificated: boolean = inject(AuthTokenStorageService).isAuthenticate();

  if (isAuthentificated) {
    return true;
  }

  return router.createUrlTree(['/auth']);
}

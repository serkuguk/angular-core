import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from "@pages/auth/services/auth.service";
import * as fromUserActions from './basic-example.actions';

//Init
export const tablesInit = createEffect(
  (init$ = inject(Actions),
   authService = inject(AuthService)) => {
    return init$.pipe(
      ofType(fromUserActions.tablesInit),
      switchMap(() =>
        authService.init().pipe(
          map((auth) => fromUserActions.tablesSuccess({access_token: auth})),
          catchError((error: { message: string }) =>
            of(fromUserActions.tablesError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

//Login
export const login = createEffect(
  (login$ = inject(Actions),
   authService = inject(AuthService),
   router = inject(Router)) => {
    return login$.pipe(
      ofType(fromUserActions.login),
      exhaustMap((credentials) =>
        authService.login(credentials).pipe(
          map((user) => fromUserActions.loginSuccess({user})),
          tap(() => router.navigate([''])),
          catchError((error: { message: string }) =>
            of(fromUserActions.loginError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

//Logout
export const logout = createEffect(
  (logout$ = inject(Actions),
    authService = inject(AuthService),
    router = inject(Router)) => {
    return logout$.pipe(
      ofType(fromUserActions.logOut),
      exhaustMap(_ =>
        authService.logout().pipe(
          map((user) => fromUserActions.logOutSuccess(user)),
          tap(() => router.navigate(['/login'])),
          catchError((error: { message: string }) =>
            of(fromUserActions.logOutError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

//User update
export const updateUser = createEffect(
  (userUpdate$ = inject(Actions),
   authService = inject(AuthService)) => {
    return userUpdate$.pipe(
      ofType(fromUserActions.updateUser),
      exhaustMap(credentials =>
        authService.userUpdate(credentials).pipe(
          map((user) => fromUserActions.updateUserSuccess(user)),
          catchError((error: { message: string }) =>
            of(fromUserActions.updateUserError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

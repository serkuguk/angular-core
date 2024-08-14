import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from "@pages/auth/services/auth.service";
import * as fromUserActions from './user.actions';

//Init
export const init = createEffect(
  (init$ = inject(Actions),
   authService = inject(AuthService)) => {
    return init$.pipe(
      ofType(fromUserActions.init),
      exhaustMap((user) =>
        authService.init(user).pipe(
          map((user) => fromUserActions.initAuthorized(user)),
          catchError((error: { message: string }) =>
            of(fromUserActions.initUnauthorized({ error: error.message }))
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
   authService = inject(AuthService)) => {
    return login$.pipe(
      ofType(fromUserActions.login),
      exhaustMap((credentials) =>
        authService.login(credentials).pipe(
          map((user) => fromUserActions.loginSuccess(user)),
          catchError((error: { message: string }) =>
            of(fromUserActions.loginError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);


  /*logout$ = createEffect(() => this.actions$.pipe(
      ofType(loginActions),
      exhaustMap((login) => this.authService.logout(login.credentials)
        .pipe(
          map(login => loginSuccessActions(login)),
          catchError((errorResponse) => {
            return of(loginFailureActions({error: errorResponse.error}));
          })
        ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
      ofType(loginActions),
      exhaustMap((login) => this.authService.login(login.credentials)
        .pipe(
          map(login => loginSuccessActions(login)),
          catchError((errorResponse) => {
            return of(loginFailureActions({error: errorResponse.error}));
          })
        ))
    )
  );*/

  // redirectAfterSubmit$ = createEffect(
  //   () => this.actions$.pipe(
  //                         ofType(fromUserActions.updateUserSuccess),
  //                         tap(() => {
  //                           void this.router.navigateByUrl('/basic-example')
  //                         })
  //                       ),
  //                 {dispatch: false}
  // )

 // constructor(private readonly router: Router) {}


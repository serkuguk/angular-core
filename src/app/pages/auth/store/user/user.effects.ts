import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from "@pages/auth/services/auth.service";
import * as fromActions from '../user.actions';

@Injectable()
export class UserEffects {
  init$ = createEffect(() => this.actions$.pipe(
      ofType(fromActions.Types.INIT),
      exhaustMap((login) => this.authService.login(login)
        .pipe(
          map(login => new fromActions.Init()),
          catchError((errorResponse) => {
            return of(new fromActions.InitError(errorResponse.error));
          })
        ))
    )
  );

  login$ = createEffect(() => this.actions$.pipe(
      ofType(fromActions.Types.SIGN_IN),
      exhaustMap((login) => this.authService.login(login)
        .pipe(
          map(login => new fromActions.SignInSuccess(login)),
          catchError((errorResponse) => {
            return of(new fromActions.SignInError(errorResponse.error));
          })
        ))
    )
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

  redirectAfterSubmit$ = createEffect(
    () => this.actions$.pipe(
                          ofType(fromActions.Types.SIGN_IN_SUCCESS),
                          tap(() => {
                            this.router.navigateByUrl('/')
                          })
                        ),
                  {dispatch: false}
  )

  constructor(private readonly actions$: Actions,
              private readonly authService: AuthService,
              private readonly router: Router) {}
}

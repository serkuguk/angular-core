import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import { AuthService } from './../../services/auth.service';
import {from, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {UserInterface} from '@app/shared/types/backend/types/user-interface';
import { loginActions, loginFailureActions, loginSuccessActions } from '../actions/login.actions';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
                              ofType(loginActions),
                              switchMap(credentials => {
                                return from(this.authService.login(credentials)).pipe(
                                  switchMap(signInState => of([]).pipe(
                                      map(currentUser => {
                                        return loginSuccessActions({currentUser})
                                      })
                                    )
                                  ),
                                  catchError((errorResponse) => {
                                    return of(loginFailureActions({error: errorResponse.error}));
                                  })
                                );
                              })
                            )

  )

  redirectAfterSubmit$ = createEffect(
    () => this.actions$.pipe(
                          ofType(loginSuccessActions),
                          tap(() => {
                            this.router.navigateByUrl('/')
                          })
                        ),
                  {dispatch: false}
  )

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router) {}
}

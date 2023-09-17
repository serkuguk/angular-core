import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loginActions, loginFailureActions, loginSuccessActions} from '@app/pages/auth/store/actions/login.actions';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';
import {UserService} from '@app/pages/auth/services/user.service';
import {from, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserInterface} from '@app/shared/types/backend/types/user-interface';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
                              ofType(loginActions),
                              switchMap(credentials => {
                                return from(this.afAuth.signInWithEmailAndPassword(credentials.credentials.email, credentials.credentials.password)).pipe(
                                  switchMap(signInState => this.afs.collection(`users`).doc(signInState.user.uid).valueChanges().pipe(
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
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private userService: UserService,
              private router: Router) {}
}

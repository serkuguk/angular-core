import {createAction, props} from '@ngrx/store'
import {ActionTypes} from '@app/pages/auth/store/actionTypes'
import {EmailPasswordCredentialsInterface} from '@app/pages/auth/types/email-password-credentials-interface'
import firebase from 'firebase';
import {UserInterface} from '@app/shared/types/backend/types/user-interface';


export const loginActions = createAction(
  ActionTypes.SIGN_IN_EMAIL,
  props<{credentials: EmailPasswordCredentialsInterface}>()
)

export const loginSuccessActions = createAction(
  ActionTypes.SIGN_IN_EMAIL_SUCCESS,
  props<{currentUser: any}>()
)

export const loginFailureActions = createAction(
  ActionTypes.SIGN_IN_EMAIL_FAILURE,
  props<{error: string}>()
)


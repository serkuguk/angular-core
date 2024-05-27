import {createAction, props} from '@ngrx/store'
import { ActionTypes } from '../actionTypes'
import { LoginRequestInterface } from '../../types/login-request_interface'

export const loginActions = createAction(
  ActionTypes.SIGN_IN,
  props<{credentials: LoginRequestInterface}>()
)

export const loginSuccessActions = createAction(
  ActionTypes.SIGN_IN_SUCCESS,
  props<{currentUser: any}>()
)

export const loginFailureActions = createAction(
  ActionTypes.SIGN_IN_FAILURE,
  props<{error: string}>()
)


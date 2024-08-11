import { Action, createAction, props} from '@ngrx/store'
import { User, UsernamePasswordCredentials, UserCreateRequest } from './user.models';

export enum Types {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGN_IN = '[User] Sign In: Start',
  SIGN_IN_SUCCESS = '[User] Sign In: Success',
  SIGN_IN_ERROR = '[User] Sign In: Error',

  SIGN_OUT = '[User] Sign Out: Start',
  SIGN_OUT_SUCCESS = '[User] Sign Out: Success',
  SIGN_OUT_ERROR = '[User] Sign Out: Error',

  UPDATE = '[User] Update: Start',
  UPDATE_SUCCESS = '[User] Update: Success',
  UPDATE_ERROR = '[User] Update: Error'
}


// Init
export class Init implements Action {
  readonly type = Types.INIT;
  constructor() { }
}

export class InitAuthorized implements Action {
  readonly type = Types.INIT_AUTHORIZED;
  constructor(public uid: string, public user: User) { }
}

export class InitUnauthorized implements Action {
  readonly type = Types.INIT_UNAUTHORIZED;
  constructor() { }
}

export class InitError implements Action {
  readonly type = Types.INIT_ERROR;
  constructor(public error: string) { }
}

// Sign In
export class SignIn implements Action {
  readonly type = Types.SIGN_IN;
  constructor(public credentials: UsernamePasswordCredentials) { }
}

export class SignInSuccess implements Action {
  readonly type = Types.SIGN_IN_SUCCESS;
  constructor(public uid: string, public user: User) { }
}

export class SignInError implements Action {
  readonly type = Types.SIGN_IN_ERROR;
  constructor(public error: string) { }
}

// Sign Out
export class SignOut implements Action {
  readonly type = Types.SIGN_OUT;
  constructor() { }
}

export class SignOutSuccess implements Action {
  readonly type = Types.SIGN_OUT_SUCCESS;
  constructor() { }
}

export class SignOutError implements Action {
  readonly type = Types.SIGN_OUT_ERROR;
  constructor(public error: string) { }
}


// Update
export class Update implements Action {
  readonly type = Types.UPDATE;
  constructor(public user: User) { }
}

export class UpdateSuccess implements Action {
  readonly type = Types.UPDATE_SUCCESS;
  constructor(public user: User) { }
}

export class UpdateError implements Action {
  readonly type = Types.UPDATE_ERROR;
  constructor(public error: string) { }
}




/*export const loginActions = createAction(
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
)*/

export type All
    = Init
    | InitAuthorized
    | InitUnauthorized
    | InitError
    | SignIn
    | SignInSuccess
    | SignInError
    | SignOut
    | SignOutSuccess
    | SignOutError;
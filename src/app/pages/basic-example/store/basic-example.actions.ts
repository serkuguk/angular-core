import {createAction, props} from '@ngrx/store'
import {Types} from './actionTypes';

// Init
export const tablesInit = createAction(
  Types.TABLES_INIT
);

export const tablesSuccess = createAction(
  Types.TABLES_SUCCESS,
  props<{ basicData: any }>()
);

export const tablesError = createAction(
  Types.TABLES_ERROR,
  props<{error: string}>()
);


// Login
export const login = createAction(
  Types.LOGIN,
  props<{ username: string, password: string}>()
);

export const loginSuccess = createAction(
  Types.LOGIN_SUCCESS,
  props<{ user: any }>()
);

export const loginError = createAction(
  Types.LOGIN_ERROR,
  props<{ error: string }>()
);


// Log Out
export const logOut = createAction(
  Types.LOGOUT,
  props<{ user: null }>()
);

export const logOutSuccess = createAction(
  Types.LOGOUT_SUCCESS,
  props<{ user: null }>()
);

export const logOutError = createAction(
  Types.LOGOUT_ERROR,
  props<{ error: string }>()
);

// Update
export const updateUser = createAction(
  Types.UPDATE,
  props<{ user: any }>()
);

export const updateUserSuccess = createAction(
  Types.UPDATE_SUCCESS,
  props<{ user: any }>()
);

export const updateUserError = createAction(
  Types.UPDATE_ERROR,
  props<{ error: string }>()
);

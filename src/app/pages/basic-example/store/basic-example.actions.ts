import {createAction, props} from '@ngrx/store'
import {Types} from './actionTypes';

// Table
export const tablesInit = createAction(
  Types.TABLES_INIT
);

export const tablesSuccess = createAction(
  Types.TABLES_SUCCESS,
  props<{basicData: any}>()
);

export const tablesError = createAction(
  Types.TABLES_ERROR,
  props<{error: string}>()
);


// Dropdown
export const dropdownInit = createAction(
  Types.DROPDOWN_INIT
);

export const dropdownSuccess = createAction(
  Types.DROPDOWN_SUCCESS,
  props<{ basicData: any }>()
);

export const dropdownError = createAction(
  Types.DROPDOWN_ERROR,
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

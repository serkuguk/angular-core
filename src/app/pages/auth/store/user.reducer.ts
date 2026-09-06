import { User } from './user.models';
import {createFeature, createReducer, on} from "@ngrx/store";
import * as UserLoginActions from './user.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user: User | null;
    access_token: string | boolean | null;
    loading: boolean | null;
    role: string | null;
    error: string | null;
}

export const initialState: UserState = {
    user: null,
    access_token: null,
    loading: null,
    role: null,
    error: null
};

export const loginFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UserLoginActions.init,
      state => ({ ...state})
    ),

    on(UserLoginActions.initAuthorized,
      (state, {access_token, user}) => ({...state, access_token, user, role: user.role, loading: false, error: null})
    ),

    on(UserLoginActions.initUnauthorized,
      () => ({ ...initialState, loading: false })
    ),

    on(UserLoginActions.initError,
      (state, {error}) => ({ ...state, loading: false, error: error })
    ),

    //Login
    on(UserLoginActions.login,
      (state) => ({ ...state, loading: true })
    ),

    on(UserLoginActions.loginSuccess,
      (state, {user}) => ({ ...state, user, access_token: true, role: user.role, loading: false, error: null })
    ),

    on(UserLoginActions.loginError,
      (state, {error}) => ({ ...state, error, loading: false })
    ),

    //Logout
    on(UserLoginActions.logOut,
      () => ({ ...initialState, loading: true })
    ),

    on(UserLoginActions.logOutSuccess,
      () => ({ ...initialState, loading: false })
    ),

    on(UserLoginActions.logOutError,
      (_state, {error}) => ({ ...initialState, error, loading: false })
    ),

    //Update
    on(UserLoginActions.updateUser,
      state => ({ ...state, loading: true, error: null })
    ),

    on(UserLoginActions.updateUserSuccess,
      state => ({ ...state, user: state.user, loading: false })
    ),

    on(UserLoginActions.updateUserError,
      state => ({ ...state,  loading: false, error: state.error })
    ),
  )
})

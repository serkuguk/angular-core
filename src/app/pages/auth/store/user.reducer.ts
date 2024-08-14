import { User } from './user.models';
import {createFeature, createReducer, on} from "@ngrx/store";
import * as UserLoginActions from './user.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user: User | null;
    access_token: string | null;
    loading: boolean | null;
    error: string | null;
}

export const initialState: UserState = {
    user: null,
    access_token: null,
    loading: null,
    error: null
};

export const loginFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UserLoginActions.init,
      state => ({ ...state, loading: true })
    ),

    on(UserLoginActions.initAuthorized,
      state => ({ ...state, user: state.user })
    ),

    on(UserLoginActions.initUnauthorized,
      state => ({ ...state, user: null, loading: false, error: null })
    ),

    on(UserLoginActions.initError,
      state => ({ ...state, loading: false, error: state.error })
    ),

    //Login
    on(UserLoginActions.login,
      state => ({ ...state, loading: true })
    ),

    on(UserLoginActions.loginSuccess,
      state => ({ ...state, user: state.user, access_token: state.access_token, loading: false })
    ),

    on(UserLoginActions.loginError,
      state => ({ ...state,  error: state.error, loading: false })
    ),

    //Logout
    on(UserLoginActions.logOut,
      state => ({ ...state, loading: true })
    ),

    on(UserLoginActions.logOutSuccess,
      state => ({ ...state })
    ),

    on(UserLoginActions.logOutError,
      state => ({ ...state,  error: state.error, loading: false })
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

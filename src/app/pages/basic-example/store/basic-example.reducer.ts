
import {createFeature, createReducer, on} from "@ngrx/store";
import * as UserLoginActions from './basic-example.actions';

export const BASIC_EXAMPLE_KEY = 'basic-example';

export interface BasicState {
    user: string | null;
    access_token: string | boolean | null;
    loading: boolean | null;
    role: string | null;
    error: string | null;
}

export const initialState: BasicState = {
    user: null,
    access_token: null,
    loading: null,
    role: null,
    error: null
};

export const basicExampleFeature = createFeature({
  name: BASIC_EXAMPLE_KEY,
  reducer: createReducer(
    initialState,
    on(UserLoginActions.tablesInit,
      state => ({ ...state})
    ),

    on(UserLoginActions.tablesSuccess,
      (state, {access_token}) => ({...state, access_token: access_token})
    ),

    on(UserLoginActions.tablesError,
      (state, {error}) => ({ ...state, loading: false, error: error })
    ),

    //Login
    on(UserLoginActions.login,
      (state) => ({ ...state, loading: true })
    ),

    on(UserLoginActions.loginSuccess,
      (state, {user}) => ({ ...state, user: user, loading: false, error: null })
    ),

    on(UserLoginActions.loginError,
      state => ({ ...state,  error: state.error, loading: false })
    ),

    //Logout
    on(UserLoginActions.logOut,
      state => ({ ...state, loading: true })
    ),

    on(UserLoginActions.logOutSuccess,
      state => ({ ...state, error: state.error, loading: false })
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

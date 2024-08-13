import { User } from './user/user.models';
import * as fromActions from './user.actions';
import {createReducer, on} from "@ngrx/store";
import * as UserLoginActions from './user.actions';

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

export const loginReducer = createReducer(
  initialState,
  on(UserLoginActions.init,
      state => (
        { ...state, loading: true })),

      on(UserLoginActions.initAuthorized,
    state => (
        { ...state, user: state.user })),
);

export function reducer(state = initialState, action: fromActions.All): UserState {
  switch (action.type) {

    // Init
    case fromActions.Types.INIT: {
        return { ...state, loading: true };
    }

    case fromActions.Types.INIT_AUTHORIZED: {
        return { ...state, user: action.user };
    }

    case fromActions.Types.INIT_UNAUTHORIZED: {
        return { ...state, user: null, loading: false, error: null };
    }

    case fromActions.Types.INIT_ERROR: {
        return { ...state, loading: false, error: action.error };
    }

    // Sign In
    case fromActions.Types.SIGN_IN: {
        return { ...state, loading: true };
    }

    case fromActions.Types.SIGN_IN_SUCCESS: {
        return { ...state, user: action.user, };
    }

    case fromActions.Types.SIGN_IN_ERROR: {
        return { ...state, error: action.error, loading: false };
    }

    // Sign Out
    case fromActions.Types.SIGN_OUT: {
        return { ...state, loading: true};
    }

    case fromActions.Types.SIGN_OUT_SUCCESS: {
        return { ...initialState };
    }

    case fromActions.Types.SIGN_OUT_ERROR: {
        return { ...state, error: action.error, loading: false };
    }


    // Update
    case fromActions.Types.UPDATE: {
        return { ...state, loading: true, error: null };
    }

    case fromActions.Types.UPDATE_SUCCESS: {
        return { ...state, user: action.user, loading: false };
    }

    case fromActions.Types.UPDATE_ERROR: {
        return { ...state, loading: false, error: action.error };
    }

    default: {
        return state;
    }
  }

}

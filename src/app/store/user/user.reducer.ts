import { User } from './user.models';
import * as fromActions from './user.actions';

export interface UserState {
    entity: User;
    uid: string;
    loading: boolean;
    error: string;
}

const initialState: UserState = {
    entity: null,
    uid: null,
    loading: null,
    error: null
};

export function reducer(state = initialState, action: fromActions.All): UserState {
  switch (action.type) {

    // Init
    case fromActions.Types.INIT: {
        return { ...state, loading: true };
    }

    case fromActions.Types.INIT_AUTHORIZED: {
        return { ...state, entity: action.user, uid: action.uid, loading: false, error: null };
    }

    case fromActions.Types.INIT_UNAUTHORIZED: {
        return { ...state, entity: null, loading: false, error: null };
    }

    case fromActions.Types.INIT_ERROR: {
        return { ...state, loading: false, error: action.error };
    }

    // Sign In
    case fromActions.Types.SIGN_IN: {
        return { ...state, loading: true };
    }

    case fromActions.Types.SIGN_IN_SUCCESS: {
        return { ...state, entity: action.user, uid: action.uid, loading: false, error: null };
    }

    case fromActions.Types.SIGN_IN_ERROR: {
        return { ...state, error: action.error, loading: false };
    }

    // Sign Out
    case fromActions.Types.SIGN_OUT: {
        return { ...state, loading: true };
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
        return { ...state, entity: action.user, loading: false };
    }

    case fromActions.Types.UPDATE_ERROR: {
        return { ...state, loading: false, error: action.error };
    }

    default: {
        return state;
    }
  }

}
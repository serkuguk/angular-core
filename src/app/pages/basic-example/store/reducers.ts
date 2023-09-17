import {UserStateInterface} from '@app/pages/auth/types/user-state-interface'
import {Action, createReducer, on} from '@ngrx/store'
import {loginActions,
        loginFailureActions,
        loginSuccessActions} from '@app/pages/auth/store/actions/login.actions'

const initialBaseState: IBaseState = {
  entity: null,
  uid: null,
  loading: null,
  error: null,
  isLoggedIn: null
}

const baseReducer = createReducer(
  initialBaseState,
  on(loginActions,
      (state) => ({
        ...state,
        loading: true
      })
    )
)

export function reducers(state: IBaseState, action: Action) {
  return userReducer(state, action)
}

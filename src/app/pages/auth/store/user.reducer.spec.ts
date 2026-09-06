import {initialState, loginFeature} from './user.reducer';
import * as UserActions from './user.actions';

describe('user reducer session state', () => {
  const user = {username: 'demo', roleId: 'admin', access_token: 'access', role: 'admin'};

  it('restores the complete session during initialization', () => {
    expect(loginFeature.reducer(initialState, UserActions.initAuthorized({access_token: true, user}))).toEqual({
      ...initialState,
      access_token: true,
      user,
      role: 'admin',
      loading: false,
    });
  });

  it.each([
    UserActions.initUnauthorized({error: ''}),
    UserActions.logOut({user: null}),
    UserActions.logOutSuccess({user: null}),
  ])('clears all session fields for %s', action => {
    const authenticatedState = {...initialState, access_token: true, user, role: 'admin'};
    expect(loginFeature.reducer(authenticatedState, action)).toMatchObject({
      access_token: null,
      user: null,
      role: null,
    });
  });
});

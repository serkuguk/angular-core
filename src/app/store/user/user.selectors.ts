import {createFeatureSelector, createSelector} from "@ngrx/store";
import { UserState } from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserState,
  (state) => state.user
);

export const getLoading = createSelector(
  getUserState,
  (state) => state.loading
)

export const getIsAuthenticated = createSelector(
  getUserState,
  (state) => !!state.access_token
)

export const getRoleId = createSelector(
  getUser,
  (user) => user && user.roleId
)

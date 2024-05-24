import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AppStateInterface} from '@app/shared/types/store/app-state-interface'
import {UserStateInterface} from '@app/pages/auth/types/user-state-interface'

export const basicSelector = createFeatureSelector<AppStateInterface, UserStateInterface>('basic')

export const getExampleBasic = createSelector(
  basicSelector,
  (state: IBasic) => state.basic
);


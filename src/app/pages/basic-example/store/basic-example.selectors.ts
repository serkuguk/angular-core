import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BASIC_EXAMPLE_KEY, BasicState} from './basic-example.reducer';

export const getBasicExampleState = createFeatureSelector<BasicState>(BASIC_EXAMPLE_KEY);

export const getTableData = createSelector(
  getBasicExampleState,
  (state) => state.access_token
);

export const getUser = createSelector(
  getBasicExampleState,
  (state) => state.user
);

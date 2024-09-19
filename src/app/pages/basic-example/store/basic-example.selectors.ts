import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BASIC_EXAMPLE_KEY, BasicState} from './basic-example.reducer';

export const getBasicExampleState = createFeatureSelector<BasicState>(BASIC_EXAMPLE_KEY);

export const getLoading = createSelector(
    getBasicExampleState,
    (state: BasicState) => state.loading
)

export const getTableData = createSelector(
  getBasicExampleState,
  (state: BasicState) =>  state.basicData
);

export const getBasicDropdownData = createSelector(
  getBasicExampleState,
  (state: BasicState) => state.basicData
);

export const getUser = createSelector(
  getBasicExampleState,
  (state: BasicState) => state
);

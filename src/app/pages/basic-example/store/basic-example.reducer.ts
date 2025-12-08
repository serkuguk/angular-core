
import {createFeature, createReducer, on} from "@ngrx/store";
import * as BasicExampleActions from './basic-example.actions';
import {BasicDataInterface} from "@core/models/backend/basick-examples/tables.interface";

export const BASIC_EXAMPLE_KEY = 'basic-example';


export interface BasicState {
    basicData: BasicDataInterface[],
    loading: boolean | null;
    error: string | null;
}

export const initialState: BasicState = {
    basicData: [],
    loading: null,
    error: null
};

export const basicExampleFeature = createFeature({
  name: BASIC_EXAMPLE_KEY,
  reducer: createReducer(
    initialState,
    on(BasicExampleActions.tablesInit,
      state => ({ ...state, loading: true})
    ),

    on(BasicExampleActions.tablesSuccess,
      (state, {basicData}) => ({...state, basicData: basicData, loading: false, error: null})
    ),

    on(BasicExampleActions.tablesError,
        (state, {error}) => ({...state, error: error, loading: false})
    ),

    //Dropdown
    on(BasicExampleActions.dropdownInit,
        state => ({...state, loading: true})
    ),

    on(BasicExampleActions.dropdownSuccess,
        (state, {basicData}) => ({...state, basicData: basicData, loading: false, error: null})
    ),

    on(BasicExampleActions.dropdownError,
        (state, {error}) => ({...state, error: error, loading: false})
    )
  )
})

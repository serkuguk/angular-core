import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';


import * as fromBasicData from './basic-example.actions';
import {TablesService} from "@pages/basic-example/components/tables/services/tables.service";
import {SelectorsService} from "@pages/basic-example/components/selectors/services/selectors.service";


export const basicTable = createEffect(
  (basicTable$ = inject(Actions),
   tableService = inject(TablesService)) => {
    return basicTable$.pipe(
      ofType(fromBasicData.tablesInit),
       exhaustMap(() =>
        tableService.getBasicTableData().pipe(
          map((req) => fromBasicData.tablesSuccess({basicData: req.basicTable})),
            catchError((error: { message: string }) =>
                of(fromBasicData.tablesError({error: error.message}))
          )
        )
      )
    );
  },
  { functional: true }
);


export const dynamicTable = createEffect(
    (basicTable$ = inject(Actions),
     tableService = inject(TablesService)) => {
        return basicTable$.pipe(
            ofType(fromBasicData.tablesInit),
            exhaustMap(() =>
                tableService.getDinamicTableData().pipe(
                    map((req) => fromBasicData.tablesSuccess({basicData: req.basicTable})),
                    catchError((error: { message: string }) =>
                        of(fromBasicData.tablesError({error: error.message}))
                    )
                )
            )
        );
    },
    {functional: true}
);

//Dropdown
export const basicDropdownTable = createEffect(
    (basicDropdownTable$ = inject(Actions),
      selectorsService = inject(SelectorsService)) => {
          return basicDropdownTable$.pipe(
              ofType(fromBasicData.dropdownInit),
              exhaustMap(() =>
                  selectorsService.getBasicDropdownData().pipe(
                      map((req) => fromBasicData.dropdownSuccess({basicData: req.basicDataSelect})),
                      catchError((error: { message: string }) =>
                          of(fromBasicData.dropdownError({error: error.message}))
                      )
                  )
              )
          );
    },
    {functional: true}
);

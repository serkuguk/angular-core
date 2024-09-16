import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import * as fromBasicData from './basic-example.actions';
import {TablesService} from "@pages/basic-example/components/tables/services/tables.service";


export const basicTable = createEffect(
  (init$ = inject(Actions),
   tableService = inject(TablesService)) => {
    return init$.pipe(
      ofType(fromBasicData.tablesInit),
      switchMap(() =>
        tableService.getBasicTableData().pipe(
          map((data) => { console.log('test', data)
            return fromBasicData.tablesSuccess({basicData: data})}),
          catchError((error: { message: string }) =>
            of(fromBasicData.tablesError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);


export const dynamicTable = createEffect(
  (login$ = inject(Actions),
   tableService = inject(TablesService),
   router = inject(Router)) => {
    return login$.pipe(
      ofType(fromBasicData.login),
      exhaustMap((credentials) =>
        tableService.getDinamicTableData().pipe(
          map((user) => fromBasicData.loginSuccess({user})),
          tap(() => router.navigate([''])),
          catchError((error: { message: string }) =>
            of(fromBasicData.loginError({ error: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

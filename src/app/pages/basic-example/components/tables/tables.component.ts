import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

import {Store} from "@ngrx/store";
import {TableComponent} from "@shared/components/table/table.component";
import {basicColumns} from "@pages/basic-example/config/config-table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-tables',
    providers: [],
    imports: [
        CommonModule,
        TableComponent,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesComponent implements OnInit {

    /*public loading$: Observable<boolean | null> | undefined;
    public basicTableData$: Observable<BasicDataInterface[] | null> | undefined;*/
    public mockData: any[] = [];
    private readonly store: Store = inject(Store);
    private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

    ngOnInit(): void {

        this.mockData = [
            {
                id: 0,
                FechaMesAnio: '01-01-2025',
                Dia: 'Lunes',
                Hora: 8,
                Valor: '54,05'
            },
            {
                id: 1,
                FechaMesAnio: '01-01-2025',
                Dia: 'Martes',
                Hora: 10,
                Valor: '32,10'
            },
            {
                id: 2,
                FechaMesAnio: '01-01-2025',
                Dia: 'Miércoles',
                Hora: 12,
                Valor: '-5,1'
            },
            {
                id: 3,
                FechaMesAnio: '01-01-2025',
                Dia: 'Jueves',
                Hora: 16,
                Valor: '75,00'
            },
            {
                id: 4,
                FechaMesAnio: '01-01-2025',
                Dia: 'Viernes',
                Hora: 20,
                Valor: '12,34'
            }
        ];

        /*this.loading$ = this.store.pipe(select(fromLoginSelectors.getLoading));
        this.store.dispatch(basicExampleAction.tablesInit());
        this.basicTableData$ = this.store.pipe(select(basicExampleSelector.getTableData));*/
    }

    protected readonly primeNgTableColumns = basicColumns.displayedColumns;

    updateSelectedRow(row: any) {
        const filteredRow = this.mockData.findIndex(rowData => rowData.id === row.data.id);
        if (filteredRow === -1) return;

        const newRowData = [...this.mockData];
        row.data = {
            ...row.data,
            Valor: row.newValue
        }
        newRowData[filteredRow] = row.data;
        this.mockData = newRowData;
        this.cd.markForCheck();
    }
}

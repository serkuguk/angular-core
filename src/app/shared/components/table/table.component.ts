import {ChangeDetectionStrategy, Component, input, OnChanges, output, ViewChild} from '@angular/core';
import {TableModule} from "primeng/table";
import {Temporal} from '@js-temporal/polyfill';
import {TranslateModule} from "@ngx-translate/core";
import {async} from "rxjs";

interface IOutputRow {
    row: any[],
    rowIndex: number
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [TableModule, TranslateModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges {

    dataSource = input<any[]>([]);
    rows = 10;
    iconColor = input<string>('');
    iconClass = input<string>('');
    msgTooltip = input<string>('');
    dataSourceColumns = input<any[]>([]);
    paginator = input<boolean>(false);
    selectionMode = input<"single" | "multiple" | undefined | null>(null);
    scrollable = input<boolean>(true);
    responsive = input<boolean>(false);
    metaKeySelection = input<boolean>();
    resizableColumns = input<boolean>(false);
    selectedRowValue = input<null | []>();
    showIconSort = input<boolean>(true);
    showIconCondition? = input<boolean>(true);
    showFilterCondition = input<string>();
    selectRow = output<IOutputRow>();
    unselectRow = output<null>();

    @ViewChild('table') table: any;

    public customSortFun = false;

    ngOnChanges(changes: any): void {
        if (changes && changes.dataSource()
            && changes.dataSource().currentValue
            && changes.dataSource().currentValue.length > 0) {
            if (this.table && this.table.first !== undefined) {
                this.table.first = 0;
            }
        }
    }

    public onSelectedRow(event: any): void {
        this.selectRow.emit({'row': event.data, 'rowIndex': event.index});
    }

    onRowUnselect(): void {
        this.unselectRow.emit(null);
    }

    customSort(event: any): void {
        const field = event.field;
        const order = event.order;
        this.customSortFun = false;
        const typeDate = this.dataSourceColumns().filter(item => (item.type === 'date' || item.type === 'datetime') && item.field === field);
        const sortedDateField = (typeDate && typeDate[0]) ? typeDate[0].field : null;

        if (sortedDateField !== null && sortedDateField === field) {
            this.customSortFun = true;
            this.dataSource().sort((data1: any, data2: any) => {
                const value1 = Temporal.Instant.from(data1[field].toISOString());
                const value2 = Temporal.Instant.from(data2[field].toISOString());

                if (value1 > value2) {
                    return order;
                } else if (value1 < value2) {
                    return -order;
                } else {
                    return 0;
                }
            });
        }
    }

    protected readonly async = async;
}

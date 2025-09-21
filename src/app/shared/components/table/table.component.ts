import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild, effect,
    input, OnInit,
    output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {TableModule} from "primeng/table";
import {TranslateModule} from "@ngx-translate/core";
import {DatePipe, NgTemplateOutlet} from "@angular/common";
import {InputText} from "primeng/inputtext";
import {ButtonComponent} from "@shared/components/button/button.component";
import {SortEvent} from "primeng/api";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BasicInputComponent} from "@shared/components/controls/basic-input/basic-input.component";

type ColumnType =
    | 'datetime' | 'date' | 'date-mes' | 'date-reverse'
    | 'icon' | 'decimal' | 'clickable' | 'number' | 'text' | 'especial';

export interface TableColumn {
    field: string;
    header: string;
    width?: string;
    minWidth?: string;
    textAlign?: 'left' | 'center' | 'right';
    type: ColumnType;
    visible?: boolean;
    modificable?: boolean;
}

interface IOutputRow {
    row: any[],
    rowIndex: number
}

export interface TableRow {
    [key: string]: any;
    _editing?: boolean;
    _originalData?: any;
}

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        TableModule,
        TranslateModule,
        NgTemplateOutlet,
        DatePipe,
        ButtonComponent,
        FormFieldComponent,
        ReactiveFormsModule,
        BasicInputComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

    rows = 10;
    private currentlyEditingRow: TableRow | null = null;
    private readonly originalByRow = new WeakMap<any, any>();


    dataSource = input<TableRow[]>([]);
    dataSourceColumns = input<TableColumn[]>([]);
    iconColor = input<string>('');
    iconClass = input<string>('');
    msgTooltip = input<string>('');
    paginator = input<boolean>(false);
    selectionMode = input<"single" | "multiple" | undefined | null>(null);
    scrollable = input<boolean>(true);
    metaKeySelection = input<boolean>();
    resizableColumns = input<boolean>(false);
    selectedRowValue = input<null | any[]>();
    showIconSort = input<boolean>(true);
    showRowActions = input<boolean>(true);
    showIconCondition = input<boolean>(false);
    showFilterCondition = input<string>();
    customSortFun = false;
    initialForm!: FormGroup;

    //outputs
    selectRow = output<{ row: TableRow, rowIndex: number }>();
    unselectRow = output<null>();
    cellEdit = output<any>();
    rowUpdate = output<TableRow>();

    @ViewChild('table') table: any;
    @ContentChild('customCellTemplate') customCellTemplate: TemplateRef<any> | undefined;

    constructor(private readonly cd: ChangeDetectorRef, private readonly fb: FormBuilder) {
        effect(() => {
            const ds = this.dataSource();
            if (ds?.length && this.table) {
                this.table.first = 0;
            }
        });
    }

    ngOnInit() {
        this.initialForm = this.fb.group({
            inputValue: [
                { value: null, disabled: false },
                { validators: [Validators.required] },
            ],
        });
    }

    public onSelectedRow(event: any): void {
        this.selectRow.emit({row: event.data, rowIndex: event.index});
    }

    onRowUnselect(): void {
        this.unselectRow.emit(null);
    }

    onCustomSort(event: SortEvent): void {
        const { data, field, order } = event;
        if (!field) return;

        const col = this.dataSourceColumns().find(c => c.field === field);
        if (!col) return;

        const isDate = col.type === 'date' || col.type === 'datetime' || col.type === 'date-mes' || col.type === 'date-reverse';

        if (!data) return;

        data.sort((a: any, b: any) => {
            const av = a[field];
            const bv = b[field];

            if (isDate) {
                const ad = new Date(av);
                const bd = new Date(bv);
                return (ad.getTime() - bd.getTime()) * (order ?? 1);
            }
            if (typeof av === 'number' && typeof bv === 'number') {
                return (av - bv) * (order ?? 1);
            }
            return String(av).localeCompare(String(bv)) * (order ?? 1);
        });
    }

    private takeSnapshot(row: any): void {
        const snap: any = {};
        (this.dataSourceColumns() || [])
            .filter(c => c && c.modificable)
            .forEach(c => snap[c.field] = row[c.field]);
        this.originalByRow.set(row, snap);
    }

    private revertFromSnapshot(row: any): void {
        const snap = this.originalByRow.get(row);
        if (snap) {
            Object.keys(snap).forEach(k => row[k] = snap[k]);
            this.originalByRow.delete(row);
        }
    }

    public startEdit(row: TableRow, rowIndex: number): void {
        this.initialForm.controls.inputValue.setValue(row.Valor);
        if (this.currentlyEditingRow && this.currentlyEditingRow !== row) {
            this.revertFromSnapshot(this.currentlyEditingRow);
            this.currentlyEditingRow._editing = false;
        }

        if (Array.isArray(this.dataSource())) {
            this.dataSource().forEach((r, i) => {
                if (i !== rowIndex) {
                    r._editing = false;
                }
            });
        }

        row._editing = true;
        this.takeSnapshot(row);
        this.currentlyEditingRow = row;

        this.cd.markForCheck();
    }

    public confirmEdit(row: any): void {
        row._editing = false;
        this.originalByRow.delete(row);
        this.currentlyEditingRow = null;

        this.rowUpdate.emit({
            data: row,
            newValue: this.initialForm.controls.inputValue.value,
        });
    }

    public cancelEdit(row: TableRow): void {
        const snap = this.originalByRow.get(row);
        if (snap) {
            Object.keys(snap).forEach(k => row[k] = snap[k]);
            this.originalByRow.delete(row);
        }
        row._editing = false;
        this.cd.markForCheck();
    }

}

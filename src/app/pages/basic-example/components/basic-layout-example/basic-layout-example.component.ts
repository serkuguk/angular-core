import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BehaviorSubject, from, of } from 'rxjs';

import { regex, regexErrors } from '@shared/utils'
import { Observable } from 'rxjs';
import { LodashUtilsService } from '@shared/services/lodash-utils.service';

import { dataTableConfig } from '../../configs/data-table-config';
import { markFormGroupTouched } from '@shared/utils/form';
import { MODALTYPE, RESPONSETYPE } from '@shared/constants/modal-service-component-type.constant';


@Component({
  selector: 'basic-layout-example',
  templateUrl: './basic-layout-example.component.html',
  styleUrls: ['./basic-layout-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicLayoutExampleComponent implements OnInit {

	isInline: boolean = false;
	form: FormGroup;
	canEdit: boolean = false;
	loading$: Observable<boolean>;
	regexErrors = regexErrors;

	filterNameValue: string;
	filterSelectFirsValue: number;
	filterSelectSecondValue: number;
	canSave: boolean = false;
	
	capacitacionesDataValue: ICapacitacionesBack;
	selectedRow: ICapacitacionesBack;
	backapRowSelected: ICapacitacionesBack;

	checkbox: ICapacitacionesControls[];
	isTransvesalSearch: boolean = false;
	tipoCapacitacionItems: ICapacitacionesControls[] = [];
	areaconocimientoItems: ICapacitacionesControls[] = [];

	//Table
	dataSource: ICapacitacionesBack[] = [];
	dataBackup: ICapacitacionesBack[] = [];

	dysplayedColumns: string[];
	columnWidths: {[key: string]: string} = {};
	messageMap$ = new BehaviorSubject<{}>({});

	constructor(private fb: FormBuilder, /*private dialogService: DialogService*/) { }

  ngOnInit(): void {
	this.loading$ = of(false);
	this.dysplayedColumns = dataTableConfig.dysplayedColumns;
	this.columnWidths = dataTableConfig.columnWidths;

	this.form = this.fb.group({
		firstInput: [null, {
			validators: []
		}],
		firstSeletSearch: [null, {
			validators: []
		}],
		secondSelectSearch: [null, {
			validators: []
		}],
		inputSave: [{ value: '', disabled: true }, {
			validators: [
				Validators.maxLength(500),
				Validators.required,
			]
		}],
		firstSelectNew: [{ value: null, disabled: true }, {
			validators: [Validators.required]
		}],
		secondSelectNew: [{ value: null, disabled: true }, {
			validators: [Validators.required,]
		}],
		descripcion: [{ value: '', disabled: true }, {
			validators: []
		}],
		isTransversalSearch: [null, {
			validators: []
		}],
		isTransversalNew: [{ value: false, disabled: true }, {
			validators: []
		}],
		additionalInput1: [{ value: '', disabled: true }, {
			validators: []
		}],
		additionalInput2: [{ value: '', disabled: true }, {
			validators: []
		}],
		additionalInput3: [{ value: '', disabled: true }, {
			validators: []
		}],
		additionalInput4: [{ value: '', disabled: true }, {
			validators: []
		}],
		additionalInput5: [{ value: '', disabled: true }, {
			validators: []
		}]
	})

	this.checkbox = [
		{label: 'basic check', value: false, icon: null}
	];

	this.init();
  }

  init() {
	this.initialFormState(false);
	this.getAllCapacitasiones();
  }

  initialFormState(state: boolean): void {
	Object.keys(this.form.controls).forEach(ctrl => {
		if (!dataTableConfig.filterSearchItems.includes(ctrl))
		state ? this.form.controls[ctrl].enable() : this.form.controls[ctrl].disable();
	});
  }

  getAllCapacitasiones(): void {
	this.dataSource = [];
	this.dataBackup = LodashUtilsService.cloneDeep([]);
  }

  filterData(): void {
	this.dataSource = this.dataBackup.filter(el => 
		(!this.filterNameValue || el.nombre.toLowerCase().includes(this.filterNameValue.toLowerCase())) &&
		(!this.filterSelectFirsValue || el.id_tipocapacitacion === this.filterSelectFirsValue) &&
		(!this.filterSelectSecondValue || el.id_areaconocimiento === this.filterSelectSecondValue) &&
		(!this.isTransvesalSearch || el.es_transversal === this.isTransvesalSearch)
	);
  }

  clearButton(): void {
	this.initialState();
	this.cleanMessage();
  }

  initialState(): void {
	this.selectedRow = null;

	this.getAllCapacitasiones();
	this.initialFormState(false);
	this.canSave = false;

	this.filterNameValue = null;
	this.filterSelectFirsValue = null;
	this.filterSelectSecondValue = null;
	this.isTransvesalSearch = false;

	this.canEdit = false;
	this.form.reset();
  }

  addNewButton(): void {
	this.selectedRow = null;
	this.canEdit = false;
	this.canSave = true;
	this.filterNameValue = '';
	
	this.initialFormState(true);
	this.form.reset();

  }

  editButton(): void {
	this.initialFormState(true);
	this.canSave = true;
  }

  removeButton(): void {
	if (!this.form.valid) {
		return;
	}

	from(this.confirmRemveDialog('basic name')).pipe(
		map((result: any) => {
			return result === RESPONSETYPE.YES ? true : false;
		})
	).subscribe(confirm => {
		if (confirm){}
		/*this.capasitacionesService.deleteCapacitaciones({id: this.capacitacionesDataValue.id}).subscribe(deletedItems => {
			if (deletedItems)
			this.messageMap$.next({type:'success', message: `El Capacitación se ha eliminado correctamente.`});
			this.initialState();
		}, (error) => this.messageMap$.next({type:'error', message: `${error}.`}));*/
	  });
  }

  saveButton(): void {
	if (this.form.invalid) {
		markFormGroupTouched(this.form);
		return;
	}

	/*this.capasitacionesService.saveCapacitaciones(this.capacitacionesDataValue).subscribe(savedItem => {
		if (savedItem) 
		this.messageMap$.next({type:'success', message: `El Capacitación ${savedItem.httpDataResponse.nombre} se ha grabado correctamente.`});
		this.initialState();
	});*/
  }

  cancelButton(): void {	
	this.initialFormState(false);
	this.canSave = false;
	this.cleanMessage();

	this.filterNameValue = '';
  }

  selectRow(table: any) {
	this.selectedRow = LodashUtilsService.cloneDeep(table.row);
	this.backapRowSelected = LodashUtilsService.cloneDeep(table.row);
	this.canEdit = this.selectedRow ? true : false;
	this.initialFormState(false);
	this.canSave = false;
	this.cleanMessage();
  }

  private async confirmRemveDialog(nombre: any): Promise<boolean> {
	return this.dialogService.showYesNo({
		title: 'Eliminar Capacitacion',
		message: `¿Estas seguro que quieres elemenar ${nombre}?`,
		type: MODALTYPE.YESNO
	});
  }

  cleanMessage(): void {
	this.messageMap$.next({});
  }
}

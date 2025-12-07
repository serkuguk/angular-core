import { DataTable } from '../../../../views/agenda-list/interfaces/data-table.interface';

export interface AltaEstanciaStepperState {
  usuarioId: string | null;
  estanciaId: number | null;
  habitId: number | null;
  bienEstarId: number | null;
  peticionId: number | null;
  currentStep: number;
  externalValue?: null;
  completedSteps: Record<number, boolean>;
}

export interface GlobalStoreState<T = any> {
  dataArray: T;
  dataObject: T | null;
  dataString: string;
  detallePersona: T | null;
  detalleEstancia: DataTable[];
}

export const INITIAL_STEPPER_STATE: AltaEstanciaStepperState = {
  usuarioId: null,
  estanciaId: null,
  habitId: null,
  bienEstarId: null,
  peticionId: null,
  currentStep: 1,
  externalValue: null,
  completedSteps: { 1: false, 2: false, 3: false, 4: false },
};

export const STORE_CONFIG: GlobalStoreState = {
  dataArray: [],
  dataObject: null,
  dataString: '',
  detallePersona: null,
  detalleEstancia: []
};

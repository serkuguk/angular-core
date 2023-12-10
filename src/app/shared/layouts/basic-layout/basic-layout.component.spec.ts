import { AdminLayoutComponent } from './admin-layout.component';

describe('AdminLayoutComponent', () => {
	let fixture: AdminLayoutComponent;

	beforeEach(() => {
		fixture = new AdminLayoutComponent();
	});

	describe('ngOnInit', () => {
		it('El componente debe haberse creado', () => {
			expect(fixture).toBeTruthy();
		});
	});

  describe('emits', () => {
    it('Emite evento de botón nuevo', () => {
			jest.spyOn(fixture.addNewButton, 'emit');
      fixture.newButtonEvent();
      expect(fixture.addNewButton.emit).toHaveBeenCalled();
		});

    it('Emite evento de botón editar', () => {
			jest.spyOn(fixture.editButton, 'emit');
      fixture.editButtonEvent();
      expect(fixture.editButton.emit).toHaveBeenCalled();
		});

    it('Emite evento de botón borrar', () => {
			jest.spyOn(fixture.deleteButton, 'emit');
      fixture.removeButtonEvent();
      expect(fixture.deleteButton.emit).toHaveBeenCalled();
		});

    it('Emite evento de botón limpiar', () => {
			jest.spyOn(fixture.clearButton, 'emit');
      fixture.clearButtonEvent();
      expect(fixture.clearButton.emit).toHaveBeenCalled();
		});

    it('Emite evento de botón cancelar', () => {
			jest.spyOn(fixture.cancelButton, 'emit');
      fixture.cancelButtonEvent();
      expect(fixture.cancelButton.emit).toHaveBeenCalled();
		});

    it('Emite evento de botón guardar', () => {
			jest.spyOn(fixture.saveButton, 'emit');
      fixture.canSave = true;
      fixture.saveButtonEvent();
      expect(fixture.saveButton.emit).toHaveBeenCalled();
		});
  });
});

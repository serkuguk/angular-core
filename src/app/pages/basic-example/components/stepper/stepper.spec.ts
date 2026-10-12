import {TestBed} from '@angular/core/testing';
import {StepperComponent} from './stepper.component';

describe('StepperComponent', () => {
  it('creates the signal-form stepper with three steps', () => {
    const fixture = TestBed.createComponent(StepperComponent);
    const component = fixture.componentInstance;

    expect(component.stepperControl.value).toBe(0);
    expect(component.stepperSteps()).toHaveLength(3);
    expect(component.stepperModel().personalInfo.fullName).toBe('');
  });

  it('resets the signal model and selected step', () => {
    const component = TestBed.createComponent(StepperComponent).componentInstance;
    component.stepperModel.set({
      personalInfo: {fullName: 'John Doe', email: 'john@example.test'},
      addressDetails: {streetAddress: 'Main', city: 'Madrid', postalCode: '28001'},
    });
    component.stepperControl.setValue(2);

    component.resetForm();

    expect(component.stepperControl.value).toBe(0);
    expect(component.stepperModel().personalInfo.fullName).toBe('');
  });
});

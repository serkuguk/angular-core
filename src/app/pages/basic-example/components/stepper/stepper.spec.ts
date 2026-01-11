import {TestBed} from '@angular/core/testing';
import {StepperComponent} from './stepper.component';

describe('StepperComponent (unit methods only)', () => {
  let component: StepperComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: []
    }).compileComponents();

    component = TestBed.runInInjectionContext(() => new StepperComponent());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with step 0', () => {
    expect(component.stepperControl.value).toBe(0);
  });

  it('should have 3 steps configured', () => {
    expect(component.stepperSteps().length).toBe(3);
  });

  it('should initialize form groups', () => {
    expect(component.stepperFormGroup).toBeTruthy();
    expect(component.personalInfoGroup).toBeTruthy();
    expect(component.addressDetailsGroup).toBeTruthy();
  });

  it('should have invalid form on initialization', () => {
    expect(component.stepperFormGroup.valid).toBe(false);
  });

  it('should validate personal info form', () => {
    const personalInfo = component.personalInfoGroup;

    // Initially invalid
    expect(personalInfo.valid).toBe(false);

    // Fill with valid data
    personalInfo.patchValue({
      fullName: 'John Doe',
      email: 'john@example.com'
    });

    expect(personalInfo.valid).toBe(true);
  });

  it('should validate address form', () => {
    const addressDetails = component.addressDetailsGroup;

    // Initially invalid
    expect(addressDetails.valid).toBe(false);

    // Fill with valid data
    addressDetails.patchValue({
      streetAddress: '123 Main St',
      city: 'New York',
      postalCode: '10001'
    });

    expect(addressDetails.valid).toBe(true);
  });

  it('should validate email format', () => {
    const emailControl = component.personalInfoGroup.get('email');

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.hasError('email')).toBe(false);
  });

  it('should validate postal code format', () => {
    const postalCodeControl = component.addressDetailsGroup.get('postalCode');

    postalCodeControl?.setValue('abc123');
    expect(postalCodeControl?.hasError('pattern')).toBe(true);

    postalCodeControl?.setValue('12345');
    expect(postalCodeControl?.hasError('pattern')).toBe(false);

    postalCodeControl?.setValue('12345-6789');
    expect(postalCodeControl?.hasError('pattern')).toBe(false);
  });

  it('should reset form and stepper control', () => {
    // Set some values
    component.personalInfoGroup.patchValue({
      fullName: 'John Doe',
      email: 'john@example.com'
    });
    component.stepperControl.setValue(2);

    // Reset
    component.resetForm();

    expect(component.stepperControl.value).toBe(0);
    expect(component.personalInfoGroup.get('fullName')?.value).toBe(null);
    expect(component.personalInfoGroup.get('email')?.value).toBe(null);
  });

  describe('onStepChange', () => {
    it('should log step change event', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const event: any = {currentStep: 1, previousStep: 0};

      component.onStepChange(event);

      expect(consoleSpy).toHaveBeenCalledWith('Step changed:', event);
      expect(consoleSpy).toHaveBeenCalledWith('Current form values:', component.stepperFormGroup.value);
    });
  });

  describe('onStepperComplete', () => {
    it('should handle complete with valid form', () => {
      const consoleSpy = jest.spyOn(console, 'log');

      // Fill form with valid data
      component.stepperFormGroup.patchValue({
        personalInfo: {
          fullName: 'John Doe',
          email: 'john@example.com'
        },
        addressDetails: {
          streetAddress: '123 Main St',
          city: 'New York',
          postalCode: '10001'
        }
      });

      component.onStepperComplete();

      expect(consoleSpy).toHaveBeenCalledWith('Stepper completed!');
      expect(consoleSpy).toHaveBeenCalledWith('Form is valid. Submitting data:', component.stepperFormGroup.value);
    });

    it('should handle complete with invalid form', () => {
      const consoleErrorSpy = jest.spyOn(console, 'error');

      component.onStepperComplete();

      expect(consoleErrorSpy).toHaveBeenCalledWith('Form is invalid. Please check all fields.');
      expect(component.stepperFormGroup.touched).toBe(true);
    });
  });

  it('should have step configuration with correct labels and icons', () => {
    const steps = component.stepperSteps();

    expect(steps[0]).toEqual({value: 0, label: 'Personal Info', icon: 'pi pi-user'});
    expect(steps[1]).toEqual({value: 1, label: 'Address Details', icon: 'pi pi-map-marker'});
    expect(steps[2]).toEqual({value: 2, label: 'Review & Submit', icon: 'pi pi-check'});
  });

  it('should validate full name minimum length', () => {
    const fullNameControl = component.personalInfoGroup.get('fullName');

    fullNameControl?.setValue('Jo');
    expect(fullNameControl?.hasError('minlength')).toBe(true);

    fullNameControl?.setValue('John');
    expect(fullNameControl?.hasError('minlength')).toBe(false);
  });
});

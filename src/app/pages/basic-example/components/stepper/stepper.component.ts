import {Component, signal} from '@angular/core';
import {StepChangeEvent, StepConfig, StepperControlComponent, StepperStepDirective} from "@shared/components/controls";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {FormFieldComponent} from "@shared/components/controls/form-field/form-field.component";
import {BasicInputComponent} from "@shared/components/controls/basic-input/basic-input.component";

/**
 * Interface for the stepper form data structure
 */
interface StepperFormData {
  personalInfo: FormGroup<{
    fullName: FormControl<string | null>;
    email: FormControl<string | null>;
  }>;
  addressDetails: FormGroup<{
    streetAddress: FormControl<string | null>;
    city: FormControl<string | null>;
    postalCode: FormControl<string | null>;
  }>;
}

@Component({
  selector: 'app-stepper',
  imports: [
    StepperControlComponent,
    StepperStepDirective,
    ReactiveFormsModule,
    JsonPipe,
    FormFieldComponent,
    BasicInputComponent
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {

  /**
   * Form control for tracking the current step
   */
  public stepperControl = new FormControl<number>(0, {nonNullable: true});

  /**
   * Main form group containing all stepper data
   */
  public stepperFormGroup = new FormGroup<StepperFormData>({
    personalInfo: new FormGroup({
      fullName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string>('', [Validators.required, Validators.email])
    }),
    addressDetails: new FormGroup({
      streetAddress: new FormControl<string>('', [Validators.required]),
      city: new FormControl<string>('', [Validators.required]),
      postalCode: new FormControl<string>('', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)])
    })
  });

  /**
   * Configuration for the stepper steps
   */
  public stepperSteps = signal<StepConfig[]>([
    { value: 0, label: 'Personal Info', icon: 'pi pi-user' },
    { value: 1, label: 'Address Details', icon: 'pi pi-map-marker' },
    { value: 2, label: 'Review & Submit', icon: 'pi pi-check' }
  ]);

  /**
   * Get the personal info form group
   */
  get personalInfoGroup(): FormGroup {
    return this.stepperFormGroup.get('personalInfo') as FormGroup;
  }

  /**
   * Get the address details form group
   */
  get addressDetailsGroup(): FormGroup {
    return this.stepperFormGroup.get('addressDetails') as FormGroup;
  }

  /**
   * Handle stepper step change event
   */
  onStepChange(event: StepChangeEvent): void {
    console.log('Step changed:', event);
    console.log('Current form values:', this.stepperFormGroup.value);
  }

  /**
   * Handle stepper completion
   */
  onStepperComplete(): void {
    console.log('Stepper completed!');

    if (this.stepperFormGroup.valid) {
      console.log('Form is valid. Submitting data:', this.stepperFormGroup.value);
      // Here you would typically send the data to a service/API
      this.submitForm();
    } else {
      console.error('Form is invalid. Please check all fields.');
      this.stepperFormGroup.markAllAsTouched();
    }
  }

  /**
   * Submit the form data
   */
  private submitForm(): void {
    const formData = this.stepperFormGroup.getRawValue();
    console.log('Submitting form data:', formData);
    // TODO: Integrate with NgRx store or API service
  }

  /**
   * Reset the form to initial state
   */
  public resetForm(): void {
    this.stepperFormGroup.reset();
    this.stepperControl.setValue(0);
  }
}

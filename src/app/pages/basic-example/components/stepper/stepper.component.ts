import {Component, signal} from '@angular/core';
import {
  BasicInputComponent,
  FormFieldComponent,
  StepChangeEvent,
  StepConfig,
  StepperControlComponent,
  StepperStepDirective
} from "@springest/ui";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {FormField, form, required, minLength, email, pattern, submit} from "@angular/forms/signals";

/**
 * Interface for the stepper form data structure
 */
interface StepperFormData {
  personalInfo: {
    fullName: string;
    email: string;
  };
  addressDetails: {
    streetAddress: string;
    city: string;
    postalCode: string;
  };
}

@Component({
  selector: 'app-stepper',
  imports: [
    StepperControlComponent,
    StepperStepDirective,
    ReactiveFormsModule,
    JsonPipe,
    FormFieldComponent,
    BasicInputComponent,
    FormField
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
   * Signal model backing the stepper form
   */
  public stepperModel = signal<StepperFormData>({
    personalInfo: {fullName: '', email: ''},
    addressDetails: {streetAddress: '', city: '', postalCode: ''}
  });

  /**
   * Main signal form containing all stepper data
   */
  public stepperFormGroup = form(this.stepperModel, (p) => {
    required(p.personalInfo.fullName);
    minLength(p.personalInfo.fullName, 3);
    required(p.personalInfo.email);
    email(p.personalInfo.email);
    required(p.addressDetails.streetAddress);
    required(p.addressDetails.city);
    required(p.addressDetails.postalCode);
    pattern(p.addressDetails.postalCode, /^\d{5}(-\d{4})?$/);
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
   * Get the personal info form field group
   */
  get personalInfoGroup() {
    return this.stepperFormGroup.personalInfo;
  }

  /**
   * Get the address details form field group
   */
  get addressDetailsGroup() {
    return this.stepperFormGroup.addressDetails;
  }

  /**
   * Handle stepper step change event
   */
  onStepChange(event: StepChangeEvent): void {
    console.log('Step changed:', event);
    console.log('Current form values:', this.stepperModel());
  }

  /**
   * Handle stepper completion
   */
  onStepperComplete(): void {
    console.log('Stepper completed!');

    submit(this.stepperFormGroup, async () => {
      console.log('Form is valid. Submitting data:', this.stepperModel());
      // Here you would typically send the data to a service/API
      this.submitForm();
    });
  }

  /**
   * Submit the form data
   */
  private submitForm(): void {
    const formData = this.stepperModel();
    console.log('Submitting form data:', formData);
    // TODO: Integrate with NgRx store or API service
  }

  /**
   * Reset the form to initial state
   */
  public resetForm(): void {
    this.stepperModel.set({
      personalInfo: {fullName: '', email: ''},
      addressDetails: {streetAddress: '', city: '', postalCode: ''}
    });
    this.stepperControl.setValue(0);
  }
}

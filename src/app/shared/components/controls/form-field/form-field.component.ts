import {Component, OnInit, Input, input} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-form-field',
    standalone: true,
    imports: [
      CommonModule
    ],
    templateUrl: './form-field.component.html',
    styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
    public label = input<string>();
    public required = input<boolean>();
    public isInline = input<boolean>(true);
    public showLabel = input<boolean>();
    public control = input<AbstractControl>();
    public patternError = input<string>();

    hasError(): boolean {
        return false //this.control() && this.control.get().invalid && this.control().touched;
    }

    get errorKey() {
        return this.control() //&& this.control().errors && Object.keys(this.control().errors)[0];
    }
}

import { ControlItem } from '@app/core/models/frontend';
import {FormGroup} from "@angular/forms";

export const markFormGroupTouched = (formGroup: FormGroup) => {
    (Object as any).values(formGroup.controls).forEach((control: FormGroup) => {
        control.markAsTouched();

        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
};

export interface Control {
    items?: ControlItem[];
    changed?: () => void;
    map?: () => void;
}

export interface ControlEntities {
    [key: string]: Control;
}

export const mapControls = (controls: ControlEntities): void => {
    Object.keys(controls).forEach(key => {
        if (controls[key].map) {
           // controls[key].map();
        }
    });
};


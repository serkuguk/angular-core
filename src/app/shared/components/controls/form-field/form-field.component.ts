import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    effect,
    forwardRef, inject,
    input,
} from '@angular/core';
import {AbstractControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {startWith} from "rxjs/operators";
import {merge} from "rxjs";

@Component({
    selector: 'app-form-field',
    imports: [
        TranslateModule
    ],
    templateUrl: './form-field.component.html',
    styleUrl: './form-field.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormFieldComponent),
            multi: true
        }
    ],
})
export class FormFieldComponent {
    private readonly cdr = inject(ChangeDetectorRef);

    label = input<string>();
    required = input<boolean>(false);
    isInline = input<boolean>(true);
    showLabel = input<boolean>(false);
    control = input.required<AbstractControl>();
    patternError = input<string>();

    constructor() {
        effect(() => {
            const control = this.control();
            if (!control) return;

            const sub = merge(control.statusChanges, control.valueChanges)
                .pipe(startWith(null))
                .subscribe(() => this.cdr.markForCheck());

            return () => sub.unsubscribe();
        });
    }

    hasError(): boolean {
        const control = this.control();
        return !!control && control.invalid && control.touched;
    }

    get errorKey() {
        const control = this.control();
        const errs = control?.errors ?? null;
        return errs ? Object.keys(errs)[0] : null;
    }
}

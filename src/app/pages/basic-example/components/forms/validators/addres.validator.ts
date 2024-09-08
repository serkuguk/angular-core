import {Address} from "@pages/basic-example/components/forms/interfaces/forms.interface";
import {FormControl, FormGroup} from "@angular/forms";

export function getAddressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null)
  });
}

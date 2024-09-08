import {AbstractControl} from "@angular/forms";

export function validateDateRange({fromControlName, toControlName}: {fromControlName: string, toControlName: string}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName)
    const toControl = control.get(toControlName)

    if (!fromControl || !toControl) return null

    const fromDate = new Date(fromControl.value)
    const toDate = new Date(toControl.value)

    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({dateRange: {message: 'The start date cannot be later than the end date.'}})
      return {dateRange: {message: 'The start date cannot be later than the end date.'}}
    }

    return null
  }
}

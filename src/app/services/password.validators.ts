import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null; // If the value is empty, return null (meaning no error)
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordPattern.test(control.value)) {
      return { 'weakPassword': true }; // If the password doesn't match the pattern, return an error
    }

    return null; // Otherwise, return null (no error)
  };
}

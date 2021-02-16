import { FormGroup } from '@angular/forms';

export function PasswordConfirmationValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.passwordConfirmationValidator) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ passwordConfirmationValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

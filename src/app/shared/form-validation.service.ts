import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor() { }
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field?.invalid && field?.touched ? true : false;
}

getErrorMessage(form: FormGroup, fieldName: string): string | null {
  const field = form.get(fieldName);

  if (!field) return null;
  if (field.hasError('required')) return 'This field is required';
  if (field.hasError('email')) return 'Invalid email format';
  if (field.hasError('minlength')) return `Minimum length is ${field.errors?.['minlength'].requiredLength}`;
  if (field.hasError('maxlength')) return `Maximum length is ${field.errors?.['maxlength'].requiredLength}`;
  if (fieldName === 'confirmPassword' && form.hasError('passwordMisMatch')) {
    return 'Password does not match';
  }
  return null;
}
}
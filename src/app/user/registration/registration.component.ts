import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormValidationService } from '../../shared/form-validation.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private validationService: FormValidationService) {
    this.form = this.formBuilder.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );

    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
  
    if (!password || !confirmPassword) return null;
    if (!confirmPassword.value) return null; 
    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMisMatch: true });
      return { passwordMisMatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  };

  isFieldInvalid(fieldName: string): boolean {
    return this.validationService.isFieldInvalid(this.form, fieldName);
  }

  getErrorMessage(fieldName: string): string | null {
    return this.validationService.getErrorMessage(this.form, fieldName);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }
    console.log('Form Submitted Successfully!', this.form.value);
  }
}

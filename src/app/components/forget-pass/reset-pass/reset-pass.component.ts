import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  public updatePasswordForm: FormGroup;

  constructor(private http: HttpService, private router: Router, private fb: FormBuilder) {
    this.updatePasswordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.updatePasswordForm.invalid) {
      return;
    }

    const email = localStorage.getItem('email');
    if (!email) {
      alert('No email found. Please try again.');
      return;
    }

    const { password } = this.updatePasswordForm.value;

    // Call the API to update the password
    this.http.post(`auth/password-update`, { email, password }, false)
      .subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error updating password:', err);
        }
      });
  }
}

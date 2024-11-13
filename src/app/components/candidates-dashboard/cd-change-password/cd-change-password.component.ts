import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-cd-change-password',
  templateUrl: './cd-change-password.component.html',
  styleUrls: ['./cd-change-password.component.scss']
})
export class CdChangePasswordComponent {
  public changePassword: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService) {
    this.changePassword = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator function
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword');
    const confirmPassword = formGroup.get('confirm_password');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  changePwd() {
    if (this.changePassword.valid) {
      this.http.post('auth/change-password', this.changePassword.value, true).subscribe((res: any) => {
        console.log(res, "login response");
        if (res && res?.message === 'Password updated successfully') {
          localStorage.clear();
          window.location.reload();
        }
      });
    } else {
      // Handle form invalid state (e.g., display error messages)
      console.log('Form is invalid');
    }
  }
}

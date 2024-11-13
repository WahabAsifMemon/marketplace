import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-reset-email-send',
  templateUrl: './reset-email-send.component.html',
  styleUrls: ['./reset-email-send.component.scss']  // Fixed `styleUrl` to `styleUrls`
})
export class ResetEmailSendComponent {
  public forgetPassword: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
  ) {
    this.forgetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendOtp() {
    const email = this.forgetPassword.controls['email'].value;
    
    // Send the OTP request
    this.http.post('auth/generate-otp', { email: email }, false).subscribe(
      (res: any) => {
        // Navigate to reset-otp page upon success
        this.router.navigate(['/reset-otp']);
        
        // Store the email in localStorage
        localStorage.setItem('email', email);
      },
      (err) => {
        console.error('Error sending OTP:', err);
      }
    );
  }
}

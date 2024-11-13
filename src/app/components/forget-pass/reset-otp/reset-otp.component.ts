import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-reset-otp',
  templateUrl: './reset-otp.component.html',
  styleUrls: ['./reset-otp.component.scss']  // Fixed 'styleUrl' to 'styleUrls'
})
export class ResetOtpComponent {

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;
  email: string = '';  // Will be retrieved from localStorage
  otp: string[] = ['', '', '', ''];

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit() {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.email = storedEmail;
    } else {
      alert('No email found! Redirecting to reset password page.');
      this.router.navigate(['/reset-pass']);
    }
  }

  ngAfterViewInit() {
    // Automatically focus on the first input field
    this.inputs.first.nativeElement.focus();
  }

  resendOTP() {
    this.otp = ['', '', '', ''];
    this.inputs.forEach(input => {
      input.nativeElement.value = '';
      input.nativeElement.disabled = false;
    });
    this.inputs.first.nativeElement.focus();
  }

  onInputChange(event: any, index: number) {
    const inputValue = event.target.value;
    if (inputValue.length > 1) {
      event.target.value = inputValue.slice(0, 1);
    }
    this.otp[index] = event.target.value;
    if (inputValue.length === 1 && index < this.inputs.length - 1) {
      this.inputs.get(index + 1)?.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index]) {
      if (index > 0) {
        this.inputs.get(index - 1)?.nativeElement.focus();
      }
    }
    if (event.key === 'e') {
      event.preventDefault();
    }
  }

  verifyOTP() {
    const otp = this.otp.join('');
    if (otp.length === 4) {
      this.http.post('auth/verify-otp', { email: this.email, otp: otp }, false).subscribe(
        (res: any) => {
          this.router.navigate(['/reset-new-pass']);
        },
        (err) => {
          console.error('Error verifying OTP:', err);
        }
      );
    } else {
      alert('Please enter a 4-digit OTP');
    }
  }
}

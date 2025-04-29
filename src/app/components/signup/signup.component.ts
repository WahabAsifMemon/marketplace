import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public EmployerSignupForm: FormGroup;
  public isOpen: boolean = false;
  public title: string = "You're in!";

  constructor(
    private router: Router,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.EmployerSignupForm = this.fb.group({
      first_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]],
      password: [null, [Validators.required]],
      workAuthorization: [null], // Required only for Students
      phone_number: [null, [Validators.required]],
    });
  }

  // Handle Role Change
  onRoleChange() {
    if (this.EmployerSignupForm.get('role')?.value !== 'Candidate') {
      this.EmployerSignupForm.get('workAuthorization')?.setValue(null);
    }
  }

  onSubmit() {
    if (this.EmployerSignupForm.valid) {
      console.log('Employee creating...');
      const formData = this.EmployerSignupForm.value;
  
      this.http.post('auth/signup', formData, false).subscribe(
        (res: any) => {
          this.EmployerSignupForm.reset();
  
          // Show SweetAlert success message
          Swal.fire({
            title: 'Successfully Signup!',
            text: 'Thank you for signing up for early access to Job Towners! We’ll keep you updated with exclusive promotions and launch details.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#1eabfc' // Set your desired color here
          });
          
  
        },
        (error: any) => {
          console.error('Signup error:', error);
        }
      );
    } else {
      console.log('Form validation failed');
    }
  }
  

  // Close Modal
  onClose() {
    this.isOpen = false;
  }
}

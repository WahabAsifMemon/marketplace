import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent {
  public CandidateloginForm: FormGroup;
  public candidateLogin: FormGroup;
  public EmployerloginForm: FormGroup;
  public employerLogin: FormGroup;
  RegisterCandidate: boolean=false;
  RegisterEmployee:boolean=false;
  LoginCandidate: boolean=false;
  LoginEmployee: boolean=false;

  isFormValid: boolean = false;
  public isAgreed: boolean = false;


  // Navbar Sticky
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = scrollPosition >= 50;
  }

  constructor(
    private router: Router,
    private http: HttpService,
    private helper: HelperService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.CandidateloginForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: ['candidate', [Validators.required]],
      permit_image: [null, Validators.required], // New
      id_proof_image: [null, Validators.required], // New
    });

    this.CandidateloginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.CandidateloginForm.valid;
    });

    this.candidateLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    this.EmployerloginForm = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: ['employer', [Validators.required]],
    });

    this.EmployerloginForm.valueChanges.subscribe(() => {
      this.isFormValid = this.EmployerloginForm.valid;
    });

    this.employerLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      role: ['employer', [Validators.required]],
    });
  }

  classApplied = false;
  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  // Tabs 1
  currentTab = 'tab1';
  switchTab(event: MouseEvent, tab: string) {
      event.preventDefault();
      this.currentTab = tab;
  }

  // Tabs 2
  currentInnerTab = 'innerTab1';
  switchInnerTab(event: MouseEvent, tab: string) {
      event.preventDefault();
      this.currentInnerTab = tab;
  }


  // Modal Popup
  isOpen = false;
  openPopup(): void {
    this.isOpen = true;
  }
  closePopup(): void {
    this.isOpen = false;
  }

  createUserAccount() {
    this.RegisterCandidate = true;
    // Mark all fields as touched
    console.log('candidate creating')
    if (this.CandidateloginForm.valid) {
        const formData = this.CandidateloginForm.value;
        this.http.post('auth/signup', formData, false).subscribe(
            (res: any) => {
              const userId = res.user.id; // Extract user id from response
              const role = res.user.role; // Extract user id from response
      
              localStorage.setItem('user_id',  userId );
              localStorage.setItem('role',  role );
      
              this.currentTab = 'tab1'
              this.router.navigate(['/pricing']);  // Navigate to the pricing page // Switch to the login tab
            },
            (error: any) => {
              console.log('error');

            }
        );
    } else {
      console.log('error');

    }
  }


createEmployerAccount() {
  this.RegisterEmployee = true;
  if (this.EmployerloginForm.valid) {
    console.log('employee creating')
    const formData = this.EmployerloginForm.value;
    this.http.post('auth/signup', formData, false).subscribe(
      (res: any) => {
        const userId = res.user.id; // Extract user id from response
        const role = res.user.role; // Extract user id from response

        localStorage.setItem('user_id',  userId );
        localStorage.setItem('role',  role );

        this.currentTab = 'tab1'
        this.router.navigate(['/pricing']);  // Navigate to the pricing page
      },
      (error: any) => {
      console.log('error');
      }
    );
  } else {
    console.log('error');
  }
}


  // loginCandidate() {
  //   this.LoginCandidate =true;
  //   this.http.post('auth/login', this.candidateLogin.value, false).subscribe(
  //     (res: any) => {
  //       console.log(res, "login response");
  //       localStorage.setItem('token', res?.token); // Save token to local storage
  //       localStorage.setItem('role', res?.role); // Save role to local storage
  //       this.closePopup(); // Close the popup after successful login
  //       window.location.reload();
  //     },
  //     (err: any) => {
  //       console.log(err.status, "sdfs");
  //       if (err.status == 403) {
  //         localStorage.setItem('email', this.candidateLogin.controls['email'].value);
  //         localStorage.setItem('role', this.candidateLogin.controls['role'].value);
  //       }
  //     }
  //   );
  // }

  loginCandidate() {
    this.http.post('auth/login', this.candidateLogin.value, false).subscribe(
      (res: any) => {
        console.log(res, "login response");

        localStorage.setItem('token', res?.token);
        localStorage.setItem('role', res?.role);
        localStorage.setItem('active_status', res?.user?.active_status);
        localStorage.setItem('first_name', res?.user?.first_name);
        localStorage.setItem('user_id', res?.user?.id);

        if (res?.user?.active_status === "0") {
          this.router.navigate(['/pricing']);
        } else {
          this.closePopup();
          window.location.reload();
        }
      },
      (err: any) => {
        console.log(err.status, "error");
        if (err.status === 403) {
          localStorage.setItem('email', this.candidateLogin.controls['email'].value);
          localStorage.setItem('role', this.candidateLogin.controls['role'].value);
        }
      }
    );
  }


  // loginEmployer() {
  //   this.http.post('auth/login', this.employerLogin.value, false).subscribe(
  //     (res: any) => {
  //       console.log(res, "login response");
  //       localStorage.setItem('token', res?.token); // Save token to local storage
  //       localStorage.setItem('role', res?.role); // Save role to local storage
  //       this.closePopup(); // Close the popup after successful login
  //       window.location.reload();
  //     },
  //     (err: any) => {
  //       console.log(err.status, "sdfs");
  //       if (err.status == 403) {
  //         localStorage.setItem('email', this.employerLogin.controls['email'].value);
  //         localStorage.setItem('role', this.employerLogin.controls['role'].value);
  //       }
  //     }
  //   );
  // }

  onImageSelected(event: any, controlName: string) {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      this.fileUploadHttp(files)
        .then((result: any) => {
          // Patch the specific control with the uploaded file URL
          this.CandidateloginForm.patchValue({
            [controlName]: result?.fileUrls?.[0],
          });
          console.log(`${controlName} uploaded:`, result?.fileUrls?.[0]);
        })
        .catch((error) => {
          console.error(`Error uploading ${controlName}:`, error);
        });
    }
  }

  fileUploadHttp(files: FileList): Promise<any> {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
  
    return new Promise((resolve, reject) => {
      this.http.postMedia('file/upload_files', formData, true).subscribe(
        (response: any) => {
          this.toastr.success('File Uploaded Successfully');
          resolve(response); // Assume response contains 'fileUrls'
        },
        (error) => {
          this.toastr.error('File Upload Failed');
          reject(error);
        }
      );

      setTimeout(() => {
        resolve({ fileUrls: ['https://res.cloudinary.com/dse9wrsjz/image/upload/filename.jpg'] }); // Mock response
      }, 1000);
    });
  }
  
  
}




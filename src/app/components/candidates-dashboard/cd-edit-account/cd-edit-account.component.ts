import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { ToastrService } from 'ngx-toastr'; // Assuming you're using Toastr for notifications

@Component({
  selector: 'app-cd-edit-account',
  templateUrl: './cd-edit-account.component.html',
  styleUrls: ['./cd-edit-account.component.scss']
})
export class CdEditAccountComponent {
  public id: any;
  public user: any;  // Store the user data, including images

  // New variables to store the image preview URLs
  permitImageUrl: string | undefined;
  idProofImageUrl: string | undefined;

  candidateInformation = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    phone_number: new FormControl(null, [Validators.required]),
    facebook: new FormControl(null, [Validators.required]),
    twitter: new FormControl(null, [Validators.required]),
    linkedin: new FormControl(null, [Validators.required]),
    instagram: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required]),
    permit_image: new FormControl(null, [Validators.required]),
    id_proof_image: new FormControl(null, [Validators.required]),
    user_id: new FormControl(null),
  });

  constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    await Promise.all([this.getCandidateProfile()]);
  }

  async getCandidateProfile() {
    try {
      const res: any = await this.http.get('auth/me', true).toPromise();
      if (res && res.user) {
        this.user = res.user;  // Store user data
        this.id = res.user.id;  // Store the user ID
        this.permitImageUrl = this.user?.permit_image;  // Set initial image URL for permit
        this.idProofImageUrl = this.user?.id_proof_image;  // Set initial image URL for ID Proof
        this.candidateInformation.patchValue({
          ...res.user,
          user_id: this.id  // Set the user_id in the form
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  onImageChange(event: any, controlName: string) {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      this.fileUploadHttp(files)
        .then((result: any) => {
          const uploadedImageUrl = result?.fileUrls?.[0]; // Get the actual URL from the response
          console.log(uploadedImageUrl);
  
          if (controlName === 'permit_image') {
            this.permitImageUrl = uploadedImageUrl; 
          } else if (controlName === 'id_proof_image') {
            this.idProofImageUrl = uploadedImageUrl;
          }
  
          this.candidateInformation.patchValue({
            [controlName]: uploadedImageUrl  // Set the uploaded URL in the form control
          });
  
          console.log(`${controlName} uploaded:`, uploadedImageUrl);
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
      this.http.postMedia('file/upload', formData, true).subscribe(
        (response: any) => {
          // Log the real server response and ensure the fileUrls array is included
          console.log('File Upload Response:', response);
          
          // Assuming response contains 'fileUrls' array with the uploaded image URLs
          if (response?.fileUrls && response.fileUrls.length > 0) {
            this.toastr.success('File Uploaded Successfully');
            resolve(response); // Resolve with the real response
          } else {
            this.toastr.error('File Upload Failed: No file URL returned');
            reject('No file URL returned in the response');
          }
        },
        (error) => {
          this.toastr.error('File Upload Failed');
          reject(error);
        }
      );
    });
  }
  

  async candidateupdate() {
    try {
      const res = await this.http.postMedia('auth/update', this.candidateInformation.value, true).toPromise();
      console.log(res);
      this.getCandidateProfile();  // Refresh data after update
    } catch (error) {
      console.error('Error updating company profile:', error);
    }
  }
}

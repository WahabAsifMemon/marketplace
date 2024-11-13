import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-post-a-new-job',
  templateUrl: './ed-post-a-new-job.component.html',
  styleUrls: ['./ed-post-a-new-job.component.scss']
})


export class EdPostANewJobComponent {
  public Editor = ClassicEditor;
  public categories: any;
  next: boolean = false;
  jobId: string | null = null; // To store the job id


  constructor( private http: HttpService,private route: ActivatedRoute) {}


  // Custom Validator for dropdowns
  dropdownValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value && control.value !== '-1' ? null : { invalidDropdown: true };
    };
  }

  // Custom Validator for latitude
  latitudeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lat = control.value;
      return lat >= -90 && lat <= 90 ? null : { invalidLatitude: true };
    };
  }

  // Custom Validator for longitude
  longitudeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const lon = control.value;
      return lon >= -180 && lon <= 180 ? null : { invalidLongitude: true };
    };
  }

  //Date Validator
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dateValue = control.value;
      const date = new Date(dateValue);

      if (isNaN(date.getTime())) {
        return { invalidDate: true };
      }
      const today = new Date();
      if (date < today) {
        return { pastDate: true };
      }
      return null;
    };
  }



  postJobForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    specialism: new FormControl(null, [Validators.required,this.dropdownValidator()]),    //dropdown
    category_id: new FormControl(null, [Validators.required,this.dropdownValidator()]),    //dropdown
    jobType: new FormControl(null, [Validators.required, this.dropdownValidator()]),       //dropdown
    salary: new FormControl(null, [Validators.required, this.dropdownValidator()]), //dropdown
    careerLevel: new FormControl(null, [Validators.required, this.dropdownValidator()]),   //dropdown
    experience: new FormControl(null, [Validators.required, this.dropdownValidator()]),    //dropdown
    gender: new FormControl(null, [Validators.required, this.dropdownValidator()]),        //dropdown
    industry: new FormControl(null, [Validators.required, this.dropdownValidator()]),      //dropdown
    qualification: new FormControl(null, [Validators.required, this.dropdownValidator()]), //dropdown
    deadline: new FormControl(null, [Validators.required,this.dateValidator()]),
    country: new FormControl(null, [Validators.required ,this.dropdownValidator()]),       //dropdown
    city: new FormControl(null, [Validators.required, this.dropdownValidator()]),          //dropdown
    completeAddress: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    latitude: new FormControl(null, [Validators.required,  this.latitudeValidator()]),
    longitude: new FormControl(null, [Validators.required, this.longitudeValidator()]),
    company: new FormControl('hello')

  })

    nextFunction() {
      this.next = true;
      if (this.postJobForm.valid) {
        console.log(this.postJobForm.value);
      } else {
        console.log('Form is invalid');
      }
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.queryParamMap.get('id'); // Get job id from URL
    this.loadData();

  }
  async loadData(){
    await Promise.all([this.getCategories()]);
    if (this.jobId) {
      this.getJobDetails(this.jobId); // Load job details if editing
    }
  }

  // async jobPost() {
  //   this.next = true;

  //   if (this.postJobForm.valid) {
  //   await this.http.post('jobs/create', this.postJobForm.value, true).subscribe((res: any) => {
  //       this.postJobForm.reset();
  //     });
  //   } else {
  //     console.log(this.postJobForm.value, 'Form is invalid');
  //   }
  // }

  async jobPost() {
    if (this.postJobForm.valid) {
      if (this.jobId) {
        await this.http.post(`jobs/update?id=${this.jobId}`, this.postJobForm.value, true).subscribe(
          (res: any) => {
            console.log('Job updated successfully', res);
          },
          error => {
            console.error('Error updating job:', error);
          }
        );
      } else {
        await this.http.post('jobs/create', this.postJobForm.value, true).subscribe(
          (res: any) => {
            console.log('Job created successfully', res);
            this.postJobForm.reset();
          },
          error => {
            console.error('Error creating job:', error);
          }
        );
      }

    }else {
          console.log(this.postJobForm.value, 'Form is invalid');
        }
  }

  async getJobDetails(id: string) {
    try {
      const res: any = await this.http.get(`jobs/get-by-id?id=${id}`, true).toPromise();
      if (res && res.job) {
        this.postJobForm.patchValue({
          title: res.job.title,
          description: res.job.description,
          email: res.job.email,
          specialism: res.job.specialism,
          category_id: res.job.category_id,
          jobType: res.job.jobType,
          salary: res.job.salary,
          careerLevel: res.job.careerLevel,
          experience: res.job.experience,
          gender: res.job.gender,
          industry: res.job.industry,
          qualification: res.job.qualification,
          deadline: res.job.deadline,
          country: res.job.country,
          city: res.job.city,
          completeAddress: res.job.completeAddress,
          latitude: res.job.latitude,
          longitude: res.job.longitude,
          company: res.job.company
        });
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  }


  async getCategories() {
    try {
      const res: any = await this.http.get('category/get_category', true).toPromise();
      console.log(res);
      this.categories = res?.categories;
    } catch (error) {
      console.error('Error fetching contractors:', error);
    }
  }


  onEditorChange({ editor }: any) {
    const data = editor.getData();
    // this.postJobForm.get('description')?.setValue(data);
  }


}

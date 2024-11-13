import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-company-profile',
  templateUrl: './ed-company-profile.component.html',
  styleUrls: ['./ed-company-profile.component.scss']
})
export class EdCompanyProfileComponent {
  save: boolean = false;
  saveSocialMedia: boolean = false;
  saveContact: boolean = false;
  public id: any;  // Store the user ID here
  public resUrl: any;

  constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService) {}

  ngOnInit() {
    this.getCompnayProfile(); // Call getCompnayProfile directly
  }

  companyProfile = new FormGroup({
    main_logo: new FormControl(null, [Validators.required]),
    user_id: new FormControl(null), // Initialize user_id as null
    company_name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone_number: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    website: new FormControl(null, [Validators.required, Validators.pattern('https?://.+')]),
    since: new FormControl(null, [Validators.required]),
    team_size: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    allow_in_search: new FormControl(null, [Validators.required]),
    about_company: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    facebook: new FormControl(null, [Validators.required]),
    twitter: new FormControl(null, [Validators.required]),
    linkedin: new FormControl(null, [Validators.required]),
    instagram: new FormControl(null, [Validators.required])
  });

  saveFunction() {
    this.save = true;
    if (this.companyProfile.valid) {
      console.log(this.companyProfile.value);
    } else {
      console.log('Form is invalid');
    }
  }

  contactInformation = new FormGroup({
    country: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    completeAddress: new FormControl(null, [Validators.required]),
    latitude: new FormControl(null, [Validators.required]),
    longitude: new FormControl(null, [Validators.required])
  });

  saveContactFunction() {
    this.saveContact = true;
    if (this.contactInformation.valid) {
      console.log(this.contactInformation.value);
    } else {
      console.log('Form is invalid');
    }
  }

  async getCompnayProfile() {
    try {
      const res: any = await this.http.get('auth/me', true).toPromise();
      if (res && res.user) {
        this.id = res.user.id;  // Store the user ID
        this.companyProfile.patchValue({
          ...res.user,
          ...res.user.dataValues,

          user_id: this.id  // Set the user_id in the form
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }



  onImageSelected(event: any) {
    this.helper
      .fileUploadHttp(event)
      .then((result: any) => {

        this.companyProfile.patchValue({
          main_logo: result?.fileUrls?.[0],
        });
        console.log(this.companyProfile.value);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async employeUpdate() {
      try {
        const res = await this.http.post('auth/update', this.companyProfile.value, true).toPromise();
        console.log(res);
        this.getCompnayProfile();  // Refresh data after update
      } catch (error) {
        console.error('Error updating company profile:', error);
      }

  }
}

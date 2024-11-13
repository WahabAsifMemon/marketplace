import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-cd-edit-account',
  templateUrl: './cd-edit-account.component.html',
  styleUrl: './cd-edit-account.component.scss'
})
export class CdEditAccountComponent {

  public id: any;  // Store the user ID here

constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService) {}


  candidateInformation = new FormGroup({
    first_name: new FormControl(null,[Validators.required]),
    last_name: new FormControl(null,[Validators.required]),
    username: new FormControl(null,[Validators.required]),
    phone_number: new FormControl(null,[Validators.required]),
    facebook: new FormControl(null, [Validators.required]),
    twitter: new FormControl(null, [Validators.required]),
    linkedin: new FormControl(null, [Validators.required]),
    instagram: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required]),

    user_id: new FormControl(null), 
    
  })
  
  
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
        this.id = res.user.id;  // Store the user ID
        this.candidateInformation.patchValue({
          ...res.user,
          ...res.user.dataValues,
  
          user_id: this.id  // Set the user_id in the form
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  
  
  
  async candidateupdate () {
      try {
        const res = await this.http.post('auth/update', this.candidateInformation.value, true).toPromise();
        console.log(res);
        this.getCandidateProfile();  // Refresh data after update
      } catch (error) {
        console.error('Error updating company profile:', error);
      }
   
  }

}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-edit-account',
  templateUrl: './ed-edit-account.component.html',
  styleUrl: './ed-edit-account.component.scss'
})
export class EdEditAccountComponent {
saveEmployee:boolean=false;
public id: any;  // Store the user ID here

constructor(private fb: FormBuilder, private http: HttpService, private helper: HelperService) {}

employeeInformation = new FormGroup({
  first_name: new FormControl(null,[Validators.required]),
  last_name: new FormControl(null,[Validators.required]),
  username: new FormControl(null,[Validators.required]),
  phone_number: new FormControl(null,[Validators.required]),
  facebook: new FormControl(null, [Validators.required]),
  twitter: new FormControl(null, [Validators.required]),
  linkedin: new FormControl(null, [Validators.required]),
  instagram: new FormControl(null, [Validators.required]),
  user_id: new FormControl(null), // Initialize user_id as null

  // password: new FormControl(null,[Validators.required]),
  // confirmPassword: new FormControl(null,[Validators.required])
})


ngOnInit() {

  this.loadData();

}



async loadData() {
  await Promise.all([this.getCompnayProfile()]);
}

saveEmployeeFunction() {
  this.saveEmployee = true;
  if (this.employeeInformation.valid) {
    console.log(this.employeeInformation.value);
  } else {
    console.log('Form is invalid');
  }
}


async getCompnayProfile() {
  try {
    const res: any = await this.http.get('auth/me', true).toPromise();
    if (res && res.user) {
      this.id = res.user.id;  // Store the user ID
      this.employeeInformation.patchValue({
        ...res.user,
        ...res.user.dataValues,

        user_id: this.id  // Set the user_id in the form
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}



async employeUpdate() {
    try {
      const res = await this.http.post('auth/update', this.employeeInformation.value, true).toPromise();
      console.log(res);
      this.getCompnayProfile();  // Refresh data after update
    } catch (error) {
      console.error('Error updating company profile:', error);
    }
 
}


}

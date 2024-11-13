import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  title = 'Contact Us - Jove';
  submit: boolean = false;
  settings: any;

  ContactPageForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    subject: new FormControl(null, [Validators.required]),
    msg: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    user_id: new FormControl(null),
  });

  constructor(private titleService: Title, private http: HttpService) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.fetchSettings(); // Call the fetchSettings method here
  }

  onSubmit() {
    this.submit = true;
    if (this.ContactPageForm.valid) {
      const formData = this.ContactPageForm.value;
      this.http.post('contact/create-contact', formData, true).subscribe(
        (res: any) => {
          console.log('Response:', res);
          this.ContactPageForm.reset();
          this.submit = false; // Reset submit flag
        },
        (error: any) => {
          console.error('Error:', error);
          this.submit = false;
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  fetchSettings() {
    this.http.get('setting/get_settings', false).subscribe(
      (data) => {
        this.settings = data; // Parse JSON if the response is valid
        console.log('Settings fetched successfully:', this.settings);
      },
      (error) => {
        console.error('Error fetching settings:', error);
      }
    );
  }
}

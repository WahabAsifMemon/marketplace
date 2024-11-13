import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  public subscriptionForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpService,
    private fb: FormBuilder,
  ) {
    this.subscriptionForm = this.fb.group({
      plan: [null, [Validators.required]],
    });
  }

  // Function to handle subscription buying
  buySubscription(plan: string) {
    // Set the selected plan in the form
    this.subscriptionForm.patchValue({ plan });

    if (this.subscriptionForm.valid) {
      const userId = localStorage.getItem('user_id'); // Retrieve user_id from local storage
      if (userId) {
        const formData = { ...this.subscriptionForm.value, user_id: userId }; // Add user_id to form data
        this.http.post('subscription/buy_subscription', formData, false).subscribe(
          (res: any) => {
            if (res.url) {
              // Redirect to the subscription checkout URL
              window.location.href = res.url;

              // Set active status to 1 in local storage
              localStorage.setItem('active_status', '1');
            }
          },
          (error: any) => {
            console.log('Error subscribing to the plan', error);
          }
        );
      } else {
        console.log('User ID not found in local storage');
      }
    } else {
      console.log('Subscription form is invalid');
    }
  }
}

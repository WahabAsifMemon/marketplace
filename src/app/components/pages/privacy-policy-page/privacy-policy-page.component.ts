import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-privacy-policy-page',
    templateUrl: './privacy-policy-page.component.html',
    styleUrls: ['./privacy-policy-page.component.scss']
})
export class PrivacyPolicyPageComponent {

    title = 'Privacy Policy - Jove';
    public privacy: any;


    constructor(private titleService:Title, private http: HttpService) {}

    ngOnInit() {
      this.loadData();
      this.titleService.setTitle(this.title);
    }

    async loadData() {
      await Promise.all([this.getPrivacy()]);
    }


    async getPrivacy() {

      try {
        const res: any = await this.http.get('terms/get-privacy', false).toPromise();
        this.privacy = res?.description;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
}

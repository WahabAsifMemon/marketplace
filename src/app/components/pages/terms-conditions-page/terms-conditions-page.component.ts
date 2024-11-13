import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-terms-conditions-page',
    templateUrl: './terms-conditions-page.component.html',
    styleUrls: ['./terms-conditions-page.component.scss']
})
export class TermsConditionsPageComponent {

    title = 'Terms & Conditions - Jove';
    public terms: any;

    constructor(private titleService:Title, private http: HttpService) {}


    ngOnInit() {
      this.loadData();
      this.titleService.setTitle(this.title);
    }

    async loadData() {
      await Promise.all([this.getTerms()]);
    }


    async getTerms() {

      try {
        const res: any = await this.http.get('terms/get-terms', false).toPromise();
        this.terms = res?.description;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

}

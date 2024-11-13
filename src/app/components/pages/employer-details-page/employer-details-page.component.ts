import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-employer-details-page',
    templateUrl: './employer-details-page.component.html',
    styleUrls: ['./employer-details-page.component.scss']
})
export class EmployerDetailsPageComponent {

    title = 'Employer Details - Jove';
    public employerDetail: any;
    public jobs = [];
    public employer : any;


    constructor(private titleService: Title,
      private route: ActivatedRoute,
      private http: HttpService,
      private router: Router
    ) { }

    ngOnInit() {
      this.titleService.setTitle(this.title);
      this.route.queryParams.subscribe((params) => {
        const employerId = params['id'];
        if (employerId) {
          this.loadData(employerId);
        }
      });
    }

    async loadData(id: any) {
      await Promise.all([this.getEmployerDetail(id)]);
    }




    async getEmployerDetail(id: any) {
      try {
        const res: any = await this.http
          .get(`auth/get-employer-by-id/?id=${id}`, true)
          .toPromise();

        this.employerDetail = res?.user?.employer_details;
        this.employer = res?.user;

        // Corrected from 'lenght' to 'length'
        this.jobs = res?.user?.jobs?.length || 0; // Set to 0 if jobs is undefined

        console.log(this.employerDetail, 'hdg');
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }


    onChatButtonClick() {
      // Navigates to 'candidates-dashboard/message' with employer's user ID in query params
      if (this.employer?.id) {
        this.router.navigate(['/candidates-dashboard/message'], {
          queryParams: { id: this.employer.id }
        });
      }
    }
}

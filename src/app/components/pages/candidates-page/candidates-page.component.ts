import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-candidates-page',
    templateUrl: './candidates-page.component.html',
    styleUrls: ['./candidates-page.component.scss']
})
export class CandidatesPageComponent {

  public AllCandidates: any[] = [];
  public filteredCandidates: any[] = [];
  public totalCandidates: number = 0;
  public totalPages: number = 0;
  public currentPage: number = 1;
  public perPage: number = 10; // Change this if needed
  public filter: string = '';

    title = 'Candidates - Jove';

    constructor(private titleService: Title, private http: HttpService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.route.queryParams.subscribe((params) => {
          this.loadData(params);
      });
    }


    async loadData(queryParams: any) {
      await this.getCandidates(queryParams);
      this.filteredCandidates = this.AllCandidates; // Initialize with all jobs
      this.totalCandidates = this.AllCandidates.length;
  }




    async getCandidates(queryParams: any = {}, page: number = this.currentPage) {
      try {
          const queryString = new URLSearchParams({ ...queryParams, page: page.toString() }).toString();
          const res: any = await this.http.get(`auth/get_all_candidate_for_web?${queryString}`, true).toPromise();
          this.AllCandidates = res?.candidates || [];
          this.totalCandidates = res?.pagination?.totalCandidates || 0;
          this.totalPages = res?.pagination?.totalPages || 0;
          this.currentPage = res?.pagination?.currentPage || 1;
          this.filteredCandidates = this.AllCandidates;
      } catch (error) {
          console.error('Error fetching jobs:', error);
      }
  }

  async changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Prevent invalid page
    await this.getCandidates({}, page);
}

async openCandidateDetail(id: string) {
  this.router.navigate(['/candidate-details'], {
    queryParams: { id: id },
  });
}

}

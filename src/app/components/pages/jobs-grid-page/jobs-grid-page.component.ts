import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-jobs-grid-page',
    templateUrl: './jobs-grid-page.component.html',
    styleUrls: ['./jobs-grid-page.component.scss']
})
export class JobsGridPageComponent implements OnInit {
    public AllJob: any[] = [];
    public filteredJobs: any[] = [];
    public totalJobs: number = 0;
  userRole: string | null = null; // Variable to store user role

    public totalPages: number = 0;
  bookmarkedJobs = new Set<number>();
    public currentPage: number = 1;
    public perPage: number = 10; // Change this if needed
    public filter: string = '';
    title = 'Jobs Grid - Jove';

    constructor(private titleService: Title, private http: HttpService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.route.queryParams.subscribe((params) => {
            this.loadData(params);
        });
        this.userRole = this.getUserRole(); // Get the user role

    }

    async loadData(queryParams: any) {
        this.getBookmarkedJobs();
        await this.getJobs(queryParams);
        this.filteredJobs = this.AllJob; // Initialize with all jobs
        this.totalJobs = this.AllJob.length;
    }

    async getJobs(queryParams: any = {}, page: number = this.currentPage) {
        try {
            const queryString = new URLSearchParams({ ...queryParams, page: page.toString() }).toString();
            const res: any = await this.http.get(`jobs/get_all_jobs?${queryString}`, true).toPromise();
            this.AllJob = res?.jobs || [];
            this.totalJobs = res?.pagination?.totalJobs || 0;
            this.totalPages = res?.pagination?.totalPages || 0;
            this.currentPage = res?.pagination?.currentPage || 1;
            this.filteredJobs = this.AllJob;
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    async getBookmarkedJobs(): Promise<void> {
      try {
        const res: any = await this.http.get('jobs/my-bookmarks', true).toPromise();
        this.bookmarkedJobs = new Set(res?.jobs.map((job: any) => job.jobId));
        console.log('Bookmarked jobs:', this.bookmarkedJobs);
      } catch (error) {
        console.error('Error fetching bookmarked jobs:', error);
      }
    }

    getUserRole(): string | null {
      return localStorage.getItem('role');
    }




    async changePage(page: number) {
        if (page < 1 || page > this.totalPages) return; // Prevent invalid page
        await this.getJobs({}, page);
    }

    async openJobDetail(id: string) {
        this.router.navigate(['/job-details'], {
            queryParams: { id: id },
        });
    }

    isBookmarked(jobId: number): boolean {
        return this.bookmarkedJobs.has(jobId);
      }

      isEmployer(): boolean {
        return this.userRole === 'employer';
      }



      // Toggle bookmark status
      async toggleBookmark(jobId: number): Promise<void> {
        try {
          if (this.isBookmarked(jobId)) {
            await this.http.post(`jobs/remove-bookmark`, { jobId }, true).toPromise();
            this.bookmarkedJobs.delete(jobId);  // Update the local set
          } else {
            await this.http.post('jobs/bookmark', { jobId }, true).toPromise();
            this.bookmarkedJobs.add(jobId);  // Update the local set
          }
        } catch (error) {
          console.error('Error toggling bookmark:', error);
        }
      }
}

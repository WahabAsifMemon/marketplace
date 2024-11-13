import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PageBannerService {
  public AllJob: any[] = [];
  public filteredJobs: any[] = [];
  public totalJobs: number = 0;
  public filter: string = ''; // Store selected filter criteria

  private titles: { [key: string]: { h1: string, li: string } } = {
    '/pricing': { h1: 'Our Pricing', li: 'Pricing' },
    '/about': { h1: 'About Us', li: 'About Us' },
    '/terms-conditions': { h1: 'Terms & Conditions', li: 'Terms & Conditions' },
    '/privacy-policy': { h1: 'Privacy Policy', li: 'Privacy Policy' },
    '/contact': { h1: 'Contact Us', li: 'Contact Us' },
    '/employers': { h1: 'Employers', li: 'Employers' },
    '/employer-details': { h1: 'Employer Details', li: 'Employer Details' },
    '/candidates': { h1: 'Candidates', li: 'Candidates' },
    '/candidate-details': { h1: 'Candidate Details', li: 'Candidate Details' },
    '/job-details': { h1: 'There are 58,612 jobs for you', li: 'Job Details' },
    '/jobs-grid': { h1: 'There are {{ totalJobs }} jobs for you', li: 'Jobs' },
    // Add more routes and titles as needed
  };

  public currentH1Title: string = '';
  public currentLiTitle: string = '';

  constructor(private router: Router, private http: HttpService) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateTitle(event.url);
      });

    // Call loadData during service initialization
    this.loadData(); 
  }

  async loadData() {
    await this.getJobs();
    this.filteredJobs = this.AllJob; // Initialize with all jobs
    this.totalJobs = this.AllJob.length; // Set the total number of jobs
    this.updateTitle(this.router.url); // Update the title based on current URL
    console.log('Total jobs:', this.totalJobs); // Print the total number of jobs
  }

  async getJobs() {
    try {
      const res: any = await this.http.get('jobs/get_all_jobs', true).toPromise();
      this.AllJob = res?.jobs || [];
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  }

  private updateTitle(url: string) {
    let title = this.titles[url] || { h1: 'Page', li: 'Page' };
    // Replace placeholder with actual job count
    this.currentH1Title = title.h1.replace('{{ totalJobs }}', this.totalJobs.toString());
    this.currentLiTitle = title.li;
  }
}

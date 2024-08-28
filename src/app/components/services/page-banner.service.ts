import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageBannerService {

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
    '/jobs-grid': { h1: 'There are 58,612 jobs for you', li: 'Jobs Grid' },
    // Add more routes and titles as needed
  };

  public currentH1Title: string = '';
  public currentLiTitle: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const titles = this.titles[event.url] || { h1: 'Page', li: 'Page' };
        this.currentH1Title = titles.h1;
        this.currentLiTitle = titles.li;
      });
  }
}

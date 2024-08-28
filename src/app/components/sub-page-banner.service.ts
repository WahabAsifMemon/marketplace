import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubPageBannerService {

  private titles: { [key: string]: { h1: string, li1: string, li2: string, li1Link: string } } = {
    '/job-details': { 
      h1: 'Job Details', 
      li1: 'Job', 
      li2: 'Job Details', 
      li1Link: '/jobs-grid' // Add the link here
    },
    // Add more routes and titles as needed
  };

  public currentH1Title: string = '';
  public currentLi1Title: string = '';
  public currentLi2Title: string = '';
  public currentLi1Link: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const titles = this.titles[event.url] || { h1: 'Page', li1: 'Page', li2: '', li1Link: '' };
        this.currentH1Title = titles.h1;
        this.currentLi1Title = titles.li1;
        this.currentLi2Title = titles.li2;
        this.currentLi1Link = titles.li1Link;
      });
  }
}

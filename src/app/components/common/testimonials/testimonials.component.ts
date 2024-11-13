import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {

  testimonials: any[] = [];
  currentTab: string = 'tab1'; // Default tab
  filteredTestimonials: any[] = []; // To hold testimonials for the current tab

  constructor(
      public router: Router,
      private http: HttpService
  ) {}

  testimonialsSlides: OwlOptions = {
      nav: false,
      margin: 25,
      loop: true,
      dots: true,
      autoplay: false,
      autoplayHoverPause: true,
      navText: [
          "<i class='ri-arrow-left-line'></i>",
          "<i class='ri-arrow-right-line'></i>",
      ],
      responsive: {
          0: { items: 1 },
          515: { items: 1 },
          695: { items: 1 },
          935: { items: 2 },
          1200: { items: 2 }
      }
  };

  ngOnInit() {
      this.loadData();
  }

  async loadData() {
      await this.getTestimonials();
  }

  // Tabs
  switchTab(event: MouseEvent, tab: string) {
      event.preventDefault();
      this.currentTab = tab;
      this.getTestimonials(); // Fetch testimonials based on the new tab
  }

  async getTestimonials() {
      try {
          const type = this.currentTab === 'tab1' ? 'Client' : 'Candidate';
          const res: any = await this.http.get(`testimonial/get-testimonial?type=${type}`, true).toPromise();
          this.testimonials = res?.testimonials || []; // Updated to match your data structure
          console.log('Testimonials:', this.testimonials);
          this.filterTestimonials(); // Filter testimonials based on selected tab
      } catch (error) {
          console.error('Error fetching testimonials:', error);
      }
  }

  filterTestimonials(): void {
      this.filteredTestimonials = this.testimonials.filter(
          (testimonial) => (this.currentTab === 'tab1' ? testimonial.type === 'Client' : testimonial.type === 'Candidate')
      );
  }
}

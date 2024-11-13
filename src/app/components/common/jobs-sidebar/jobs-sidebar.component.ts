import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-jobs-sidebar',
  templateUrl: './jobs-sidebar.component.html',
  styleUrls: ['./jobs-sidebar.component.scss']
})
export class JobsSidebarComponent {
  filters = {
    jobType: '',
    careerLevel: '',
    qualification: '',
    experience: '',
    gender: '',
  };

  constructor(
    public router: Router,
    private http: HttpService
  ) { }

  onJobTypeChange(event: any) {
    this.filters.jobType = event.target.id;
  }

  onCareerChange(event: any) {
    this.filters.careerLevel = event.target.id;
  }

  onQualificationChange(event: any) {
    this.filters.qualification = event.target.id;
  }

  onExperienceChange(event: any) {
    this.filters.experience = event.target.id;
  }

  onGenderChange(event: any) {
    this.filters.gender = event.target.id;
  }

  filterNonEmptyValues(filters: any) {
    return Object.keys(filters).reduce((acc: { [key: string]: any }, key: string) => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        acc[key] = filters[key];
      }
      return acc;
    }, {});
  }

  applyFilters() {
    const cleanedFilters = this.filterNonEmptyValues(this.filters);

    const queryParams = new URLSearchParams(cleanedFilters as any).toString();

    this.router.navigate(['/jobs-grid'], {
      queryParams: cleanedFilters,
      queryParamsHandling: 'merge' // Merges the new params with the existing ones
    }).then(() => {
      this.http.get(`jobs/get_all_jobs?${queryParams}`, false).subscribe(response => {
        console.log('Filtered Jobs:', response);
      }, error => {
        console.error('Error fetching jobs:', error);
      });
    });
  }
}

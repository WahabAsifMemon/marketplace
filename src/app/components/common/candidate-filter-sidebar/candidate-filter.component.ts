import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-candidate-filter',
  templateUrl: './candidate-filter.component.html',
  styleUrls: ['./candidate-filter.component.scss']
})
export class CandidateFilterComponent {
  filters = {

    qualification: '',
    Experience: '',
    gender: '',
    first_name: '',
  };

  constructor(
    public router: Router,
    private http: HttpService
  ) { }


  onQualificationChange(event: any) {
    this.filters.qualification = event.target.id;
  }

  onExperienceChange(event: any) {
    this.filters.Experience = event.target.id;
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

  applyFilters(event: Event) {
    event.preventDefault(); // Prevent default form submission

    const cleanedFilters = this.filterNonEmptyValues(this.filters);

    const queryParams = new URLSearchParams(cleanedFilters as any).toString();

    this.router.navigate(['/candidates'], {
      queryParams: cleanedFilters,
      queryParamsHandling: 'merge' // Merges the new params with the existing ones
    }).then(() => {
      this.http.get(`auth/get_all_candidate_for_web?${queryParams}`, true).subscribe(response => {
        console.log('Filtered Candidates:', response);
      }, error => {
        console.error('Error fetching candidates:', error);
      });
    });
  }
}

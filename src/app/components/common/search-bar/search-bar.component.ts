import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  filters = {
    title: '',
    city: '',
  };

  constructor(private router: Router, private http: HttpService) {}

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
      queryParamsHandling: 'merge'
    }).then(() => {
      this.http.get(`jobs/get_all_jobs?${queryParams}`, false).subscribe(response => {
        console.log('Filtered Jobs:', response);
      }, error => {
        console.error('Error fetching jobs:', error);
      });
    });
  }
}

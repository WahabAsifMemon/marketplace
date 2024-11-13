import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-employers-page',
    templateUrl: './employers-page.component.html',
    styleUrls: ['./employers-page.component.scss']
})
export class EmployersPageComponent {
    filters = {
        category: '',
        company_name: '',
    };

    public AllEmployers: any[] = [];
    public filteredEmployers: any[] = [];
    public totalEmployers: number = 0;
    public totalPages: number = 0;
    public currentPage: number = 1;
    public perPage: number = 10; // Change this if needed

    title = 'Employers - Jove';

    constructor(private titleService: Title, private http: HttpService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.titleService.setTitle(this.title);
        this.route.queryParams.subscribe((params) => {
            this.loadData(params);
        });
    }

    async loadData(queryParams: any) {
        await this.getEmployers(queryParams);
        this.filteredEmployers = this.AllEmployers; // Initialize with all jobs
        this.totalEmployers = this.AllEmployers.length;
    }

    async getEmployers(queryParams: any = {}, page: number = this.currentPage) {
        try {
            const queryString = new URLSearchParams({ ...queryParams, page: page.toString() }).toString();
            const res: any = await this.http.get(`auth/get_all_employer_for_web?${queryString}`, true).toPromise();
            this.AllEmployers = res?.employers || [];
            this.totalEmployers = res?.pagination?.totalEmployers || 0;
            this.totalPages = res?.pagination?.totalPages || 0;
            this.currentPage = res?.pagination?.currentPage || 1;
            this.filteredEmployers = this.AllEmployers;
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }

    async changePage(page: number) {
        if (page < 1 || page > this.totalPages) return;
        await this.getEmployers({}, page);
    }

    async openEmployereDetail(id: string) {
        this.router.navigate(['/employer-details'], {
            queryParams: { id: id },
        });
    }

    onCategoryChange(event: any) {
        this.filters.category = event.target.value; // Corrected to use value
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

        this.router.navigate(['/employers'], {
            queryParams: cleanedFilters,
            queryParamsHandling: 'merge' // Merges the new params with the existing ones
        }).then(() => {
            this.http.get(`auth/get_all_employer_for_web?${queryParams}`, true).subscribe(response => {
                console.log('Filtered Employers:', response);
                this.AllEmployers = response?.employers || [];
                this.totalEmployers = response?.pagination?.totalEmployers || 0;
                this.totalPages = response?.pagination?.totalPages || 0;
                this.currentPage = response?.pagination?.currentPage || 1;
                this.filteredEmployers = this.AllEmployers; // Update filteredEmployers
            }, error => {
                console.error('Error fetching candidates:', error);
            });
        });
    }
}

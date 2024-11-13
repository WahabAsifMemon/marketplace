import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-cd-applied-jobs',
  templateUrl: './cd-applied-jobs.component.html',
  styleUrls: ['./cd-applied-jobs.component.scss']
})
export class CdAppliedJobsComponent implements OnInit {

  user: any;

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadData();
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
    });
  }

  async loadData() {
    await this.getUser();
  }

  async getUser() {
    try {
      const res: any = await this.http.get('auth/me', true).toPromise();
      this.user = res?.user;
      console.log('User data:', this.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async openJobDetail(id: string) {
    this.router.navigate(['/job-details'], {
      queryParams: { id: id },
    });
  }
}

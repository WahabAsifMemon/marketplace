import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-ed-resumes',
  templateUrl: './ed-resumes.component.html',
  styleUrls: ['./ed-resumes.component.scss']
})
export class EdResumesComponent {
  getAppliedJob: any;


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
    await Promise.all([this.getApplyJob()]);
  }


  async getApplyJob() {
    try {
      const res: any = await this.http.get('jobs/get_apply_job', true).toPromise();
      console.log(res);
      this.getAppliedJob = res?.appliedJobs;
    } catch (error) {
      console.error('Error fetching contractors:', error);
    }
  }

  async openCandidateDetail(id: string) {
    this.router.navigate(['/candidate-details'], {
      queryParams: { id: id },
    });
  }
}

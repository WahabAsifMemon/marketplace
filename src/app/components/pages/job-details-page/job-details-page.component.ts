import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
    selector: 'app-job-details-page',
    templateUrl: './job-details-page.component.html',
    styleUrls: ['./job-details-page.component.scss']
})
export class JobDetailsPageComponent {
    public jobDetail: any;
  public applyForm: FormGroup;
  userRole: string | null = null;

    constructor(private titleService:Title,
        private router: Router,
         private route: ActivatedRoute,
         private http: HttpService,
         private fb: FormBuilder



    ) {
      this.applyForm = this.fb.group({
        jobId: [null, [Validators.required]],
      });
    }

    ngOnInit() {
        const title = 'Job Details';
        this.titleService.setTitle(`Jove | ${title}`);
        this.route.queryParams.subscribe((params) => {
          const jobId = params['id'];
          if (jobId) {
            this.loadData(jobId);
          }
        });
        this.userRole = this.getUserRole();
      }

    async loadData(id: any) {
        await Promise.all([this.getJobDetail(id)]);
      }

      getUserRole(): string | null {
        return localStorage.getItem('role');
      }

      async getJobDetail(id: any) {
        try {
          const res: any = await this.http
            .get(`jobs/get-by-id/?id=${id}`, true)
            .toPromise();
          this.jobDetail = res?.job;
          console.log(this.jobDetail, 'hdg');
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }


      applyJob(jobId: string) {
        this.applyForm.patchValue({ jobId });

        if (this.applyForm.valid) {
          const formData = { ...this.applyForm.value };
          this.http.post('jobs/apply_job', formData, true).subscribe(
            (res: any) => {
              console.log('Job application successful');
              window.location.reload();
            },
            (error: any) => {
              console.error('Error applying for job:', error);
            }
          );
        } else {
          console.log('Form is not valid');
        }
      }

      isEmployer(): boolean {
        return this.userRole === 'employer';
      }

}

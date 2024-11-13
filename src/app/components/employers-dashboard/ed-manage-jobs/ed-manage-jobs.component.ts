import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ed-manage-jobs',
  templateUrl: './ed-manage-jobs.component.html',
  styleUrls: ['./ed-manage-jobs.component.scss']
})
export class EdManageJobsComponent {

  EmployeJob: any;


  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.loadData();
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
    });
  }



  async loadData() {
    await Promise.all([this.getJobs()]);
  }

  async getJobs() {
    try {
      const res: any = await this.http.get('jobs/get-my-jobs', true).toPromise();
      console.log(res);
      this.EmployeJob = res?.jobs;
    } catch (error) {
      console.error('Error fetching contractors:', error);
    }
  }

  async openJobDetail(id: string) {
    this.router.navigate(['/job-details'], {
      queryParams: { id: id },
    });
  }

  async editJob(id: string) {
    this.router.navigate(['dashboard/post-a-new-job'], {
      queryParams: { id: id },
    });
  }

  async deleteJob(id: string) {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c78b97',
        cancelButtonColor: '#3a4e90',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const res: any = await this.http.post('jobs/delete', { id: id }, true).toPromise();
        console.log('Job deleted successfully:', res);

        this.loadData();
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      Swal.fire('Error', 'There was an error deleting the job.', 'error');
    }
  }

}

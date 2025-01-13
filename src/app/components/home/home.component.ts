import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/shared/services/helper.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedTab: number | null = 0;
  selectedFileName: string | null = null;
  video: any;
  resume: any;
  attachment: any;
  jobId: any;
  bookmarkedJobs = new Set<number>();
  public modalReference: any;
  public state: boolean = false;
  selectedFile: File | null = null;
  selectedResumeFile: File | null = null;

  isAgreed: boolean = false;
  isLoading = false;




  AllJob: any;
  user: any;
  filteredJobs: any[] = []; // Array to store filtered jobs

  public applyForm: FormGroup;
  public moreAttachmentForm: FormGroup;

  userRole: string | null = null; // Variable to store user role
  faqs: any[] = [];
  job_apply: any;

  tabs = [
    { label: 'Active Jobs', type: '' }, // No filter for Recent Jobs
    // { label: 'Featured Jobs', type: 'Featured' },
    // { label: 'Freelancer', type: 'Freelancer' },
    { label: 'Part Time', type: 'Part Time' },
    // { label: 'Full Time', type: 'Full Time' },
  ];

  // accordionItems = [
  //   { title: 'How can I upload my video?', content: 'Content for Accordion 1', open: false },
  //   { title: 'How can I upload my resume or CV?', content: 'Content for Accordion 2', open: false },
  //   { title: 'What should I include in my cover letter?', content: 'Content for Accordion 3', open: false },
  //   { title: 'How do I search by location?', content: 'Content for Accordion 4', open: false },
  //   { title: 'Can I apply for multiple jobs at once?', content: 'Content for Accordion 5', open: false },
  // ];

  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private helper: HelperService,

  ) {
    this.applyForm = this.fb.group({
      jobId: [null, [Validators.required]],
    });
    this.moreAttachmentForm = this.fb.group({
      file: [null],
    });
  }

  ngOnInit() {
    this.loadData();
    this.getBookmarkedJobs();
    this.userRole = this.getUserRole(); // Get the user role
  }

  async loadData() {
    await Promise.all([this.getJobs()]);
  }

  open(content: any, state: string, jobId?: number) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
    this.state = state == 'edit' ? true : false;

    if (jobId) {
      this.applyForm.patchValue({ jobId: jobId });
    }
  }

  proceed() {
    this.modalReference.close();
    this.state = false;
  }


  onFileSelected(event: any): void {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    const files = fileInput?.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      this.selectedFileName = file.name; // Store the file name
      
      // Assuming you upload the file through a helper function
      this.helper.attachUploadHttp(files)
        .then((result: any) => {
          this.moreAttachmentForm.patchValue({
            file: result.data.url, // Set the file URL or the value in the form
          });
          console.log('File uploaded successfully:', this.moreAttachmentForm.value);
        })
        .catch((error) => {
          console.error('Error during file upload:', error);
        });
    } else {
      console.error('No file selected.');
    }
  }


  async getJobs() {
    try {
      const res: any = await this.http.get('jobs/get_all_jobs', true).toPromise();
      this.AllJob = res?.jobs || [];
      this.filterJobs(); // Filter jobs based on selected tab
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }

    try {
      const res: any = await this.http.get('auth/me', true).toPromise();
      this.user = res?.user;
      this.job_apply = res?.user?.job_apply || [];
      this.video = res?.user?.candidate_videos[0]?.video_url;
      this.resume = res?.user?.resume[0]?.resume;
      this.attachment = res?.user?.attachment[0]?.resume;


      console.log('dds', this.video);
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    try {
      const res: any = await this.http.get('faq/get-all-faq', true).toPromise();
      this.faqs = res?.faqs.map((faq: any) => ({ ...faq, open: false })); // Initialize FAQs with 'open' state
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  }

  async getBookmarkedJobs(): Promise<void> {
    try {
      const res: any = await this.http.get('jobs/my-bookmarks', true).toPromise();
      this.bookmarkedJobs = new Set(res?.jobs.map((job: any) => job.jobId));
      console.log('Bookmarked jobs:', this.bookmarkedJobs);
    } catch (error) {
      console.error('Error fetching bookmarked jobs:', error);
    }
  }

  

  isJobApplied(jobId: number): boolean {
    return Array.isArray(this.job_apply) && this.job_apply.some((application: any) => application.jobId === jobId);
  }
  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');

  }

  async openJobDetail(id: string) {
    this.router.navigate(['/job-details'], {
        queryParams: { id: id },
    });
}


  
  
  




  getUserRole(): string | null {
    return localStorage.getItem('role');
  }


  isBookmarked(jobId: number): boolean {
    return this.bookmarkedJobs.has(jobId);
  }



  // Toggle bookmark status
  async toggleBookmark(jobId: number): Promise<void> {
    try {
      if (this.isBookmarked(jobId)) {
        await this.http.post(`jobs/remove-bookmark`, { jobId }, true).toPromise();
        this.bookmarkedJobs.delete(jobId);  // Update the local set
      } else {
        await this.http.post('jobs/bookmark', { jobId }, true).toPromise();
        this.bookmarkedJobs.add(jobId);  // Update the local set
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  }



  applyJob() {
    if (this.applyForm.valid) {
      const formData = {
        jobId: this.applyForm.value.jobId,
      };
  
      // Set loading state to true
      this.isLoading = true;
  
      this.http.post('jobs/apply_job', formData, true).subscribe(
        (res: any) => {
          console.log('Job application successful');
          this.proceed();
          this.isLoading = false; // Reset loading state
          window.location.reload(); // Reload the page
        },
        (error: any) => {
          console.error('Error applying for job:', error);
          this.isLoading = false; // Reset loading state on error
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
  

  toggleAccordion(index: number) {
    this.faqs.forEach((item, i) => {
      if (i !== index) {
        item.open = false; // Close other items
      }
    });
    this.faqs[index].open = !this.faqs[index].open; // Toggle selected item
  }

  filterJobs() {
    const selectedTabType = this.tabs[this.selectedTab!].type;

    // Filter the jobs based on the type (if type is provided)
    this.filteredJobs = selectedTabType
      ? this.AllJob.filter((job: any) => job.jobType === selectedTabType)
      : this.AllJob;

    console.log('Filtered jobs:', this.filteredJobs);
  }

  // Select the tab and filter jobs accordingly
  selectTab(index: number): void {
    this.selectedTab = index;
    this.filterJobs();
  }

  isEmployer(): boolean {
    return this.userRole === 'employer';
  }
}

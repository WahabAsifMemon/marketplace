import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-cd-bookmarks',
  templateUrl: './cd-bookmarks.component.html',
  styleUrls: ['./cd-bookmarks.component.scss']
})
export class CdBookmarksComponent {

  public bookmark: any;

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
    await this.getBookmark();
  }

  async getBookmark() {
    try {
      const res: any = await this.http.get('jobs/my-bookmarks', true).toPromise();
      this.bookmark = res?.jobs;
      console.log('User data:', this.bookmark);
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

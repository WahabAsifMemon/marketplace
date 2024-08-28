import { Component } from '@angular/core';
import { PageBannerService } from '../../services/page-banner.service';

@Component({
  selector: 'app-page-banner',
  templateUrl: './page-banner.component.html',
  styleUrl: './page-banner.component.scss'
})
export class PageBannerComponent {
  constructor(public bannerService: PageBannerService) {}
}

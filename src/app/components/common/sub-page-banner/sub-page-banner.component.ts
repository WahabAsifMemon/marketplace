import { Component } from '@angular/core';
import { SubPageBannerService } from '../../sub-page-banner.service';

@Component({
  selector: 'app-sub-page-banner',
  templateUrl: './sub-page-banner.component.html',
  styleUrl: './sub-page-banner.component.scss'
})
export class SubPageBannerComponent {
  constructor(public bannerService: SubPageBannerService) {}
}

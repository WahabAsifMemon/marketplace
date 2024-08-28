import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-slider',
  templateUrl: './logo-slider.component.html',
  styleUrls: ['./logo-slider.component.scss'] // Ensure this path is correct
})
export class LogoSliderComponent implements OnInit {
  images: string[] = [
    '../../../assets/images/dropbox-logo.png',
    '../../../assets/images/netflix-logo.png',
    '../../../assets/images/samsung-logo.png',
    '../../../assets/images/bosch-logo.png',
    '../../../assets/images/google-logo.png', 
    '../../../assets/images/dropbox-logo.png',
    '../../../assets/images/netflix-logo.png',
    '../../../assets/images/samsung-logo.png',
    '../../../assets/images/bosch-logo.png',
    '../../../assets/images/google-logo.png', 
    '../../../assets/images/dropbox-logo.png',
    '../../../assets/images/netflix-logo.png',
    '../../../assets/images/samsung-logo.png',
    '../../../assets/images/bosch-logo.png',
    '../../../assets/images/google-logo.png', 
    '../../../assets/images/dropbox-logo.png',
    '../../../assets/images/netflix-logo.png',
    '../../../assets/images/samsung-logo.png',
    '../../../assets/images/bosch-logo.png',
    '../../../assets/images/google-logo.png', 
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

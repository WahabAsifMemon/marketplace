import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [
  ],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent {

  constructor(        public router: Router


  ) {}

}

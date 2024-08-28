import { Component } from '@angular/core';

@Component({
  selector: 'app-leading-company',
  templateUrl: './leading-company.component.html',
  styleUrls: ['./leading-company.component.scss']
})
export class LeadingCompanyComponent {

  leftList: string[] = ['Jove job listings', 'Cutting-edge technology', 'User-friendly interface', 'Direct communication'];
  rightList: string[] = ['Real-time updates', 'Responsive support', 'Employer satisfaction', 'Career advancement'];
  
}

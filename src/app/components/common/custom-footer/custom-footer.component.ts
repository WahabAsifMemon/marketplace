import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-footer',
  templateUrl: './custom-footer.component.html',
  styleUrl: './custom-footer.component.scss'
})
export class CustomFooterComponent {
  @Input() data: string | undefined;
}

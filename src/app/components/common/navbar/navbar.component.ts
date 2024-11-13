import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthPopupComponent } from '../auth-popup/auth-popup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild(AuthPopupComponent) authPopup!: AuthPopupComponent;

  isSticky: boolean = false;
  userRole: string | null = null;
  isLoggedIn: boolean = false;
  userActiveStatus: number = 0; // Track active status

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isSticky = scrollPosition >= 50;
  }

  constructor(public router: Router, private authService: AuthService) {}

  classApplied = false;

  toggleClass() {
    this.classApplied = !this.classApplied;
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.userRole = this.authService.getUserRole();
    this.userActiveStatus = this.authService.getUserActiveStatus(); // Get active status from AuthService
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  openPopup(): void {
    this.authPopup.openPopup();
  }
}

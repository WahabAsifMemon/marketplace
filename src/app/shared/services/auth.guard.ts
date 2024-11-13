import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Ensure AuthService is handling authentication

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const expectedRole = route.data.expectedRole;
    const userRole = this.authService.getUserRole();
    const activeStatus = localStorage.getItem('active_status'); // Get active status from local storage

    if (this.authService.isLoggedIn()) {
      if (expectedRole && userRole !== expectedRole) {
        // Redirect based on role mismatch
        this.router.navigate(['/access-denied']);
        return false;
      }

      // Check if the user is an employer and their active status is 0
      if (userRole === 'employer' && activeStatus === '0') {
        // Redirect employer to subscription or restricted access page
        this.router.navigate(['/pricing']);
        return false;
      }

      return true; // Allow access if everything is valid
    } else {
      this.router.navigate(['/']); // Redirect to the login page if not logged in
      return false;
    }
  }
}

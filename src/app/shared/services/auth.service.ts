import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get user role
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  // Get the user's active status from local storage
  getUserActiveStatus(): number {
    return parseInt(localStorage.getItem('active_status') || '0', 10);
  }

  // Login method to store token and active_status
  login(token: string, role: string, activeStatus: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('active_status', activeStatus.toString());
  }

  // Logout method to clear token and role
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('active_status');
  }
}

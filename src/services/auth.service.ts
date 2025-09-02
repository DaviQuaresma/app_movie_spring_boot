import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(false);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkInitialAuthState();
    }
  }

  get isAuthenticated() {
    return this.isAuthenticatedSignal.asReadonly();
  }

  private checkInitialAuthState(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      this.isAuthenticatedSignal.set(!!token);
    }
  }

  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.isAuthenticatedSignal.set(true);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}

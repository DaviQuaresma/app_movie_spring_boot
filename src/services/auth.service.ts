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
      
      if (token) {
        // Verifica se o token não está expirado
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          
          if (payload.exp && payload.exp > currentTime) {
            this.isAuthenticatedSignal.set(true);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.isAuthenticatedSignal.set(false);
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.isAuthenticatedSignal.set(false);
        }
      } else {
        this.isAuthenticatedSignal.set(false);
      }
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
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Verifica se o token não está expirado
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);
          
          if (payload.exp && payload.exp > currentTime) {
            return token;
          } else {
            this.logout();
            return null;
          }
        } catch (error) {
          this.logout();
          return null;
        }
      }
    }
    return null;
  }
}

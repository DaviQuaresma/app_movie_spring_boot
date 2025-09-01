import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from '../services/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      await authService.me();
      return true;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/userService';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = this.authService.getToken();
    const refreshToken = this.authService.getRefreshToken();

    if (!token && !refreshToken) {
      this.router.navigate(['/login']);
      return of(false);
    }

    if (!token && refreshToken) {
      return this.userService.Me().pipe(
        map(() => {
          return true;
        }),
        catchError((error) => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }

    if (token) {
      return this.userService.Me().pipe(
        map(() => {
          return true;
        }),
        catchError((error) => {

          if (refreshToken) {
            return of(false); 
          } else {
            this.router.navigate(['/login']);
            return of(false);
          }
        })
      );
    }

    this.router.navigate(['/login']);
    return of(false);
  }
}

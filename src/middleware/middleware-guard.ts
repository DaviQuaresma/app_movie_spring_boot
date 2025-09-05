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
    
    if (!token) {
      console.log('Nenhum token encontrado');
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.userService.Me().pipe(
      map(() => {
        console.log('Token válido, acesso permitido');
        return true;
      }),
      catchError((error) => {
        console.error('Erro na validação do token:', error);
        
        if (error.message?.includes('Token expirado') || 
            error.message?.includes('JWT expired') ||
            error.message?.includes('403')) {
          console.log('Token expirado ou inválido, redirecionando para login');
          this.authService.logout(); // Usa o método logout do AuthService
        }
        
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
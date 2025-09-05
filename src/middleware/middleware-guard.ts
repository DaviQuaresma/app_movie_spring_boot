import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from '../services/authService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Nenhum token encontrado');
        this.router.navigate(['/login']);
        return false;
      }

      await authService.me();
      console.log('Token válido, acesso permitido');
      return true;
    } catch (error: any) {
      console.error('Erro na validação do token:', error);
      
      if (error.message?.includes('Token expirado') || 
          error.message?.includes('JWT expired') ||
          error.message?.includes('403')) {
        console.log('Token expirado ou inválido, redirecionando para login');
        localStorage.removeItem('token'); // Remove token inválido
      }
      
      this.router.navigate(['/login']);
      return false;
    }
  }
}
import { Injectable, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSignal = signal<boolean>(false);

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
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
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          if (payload.exp && payload.exp > currentTime) {
            this.isAuthenticatedSignal.set(true);
          } else {
            // NÃO faz logout aqui - apenas limpa token expirado
            localStorage.removeItem('token');
            this.isAuthenticatedSignal.set(false);
          }
        } catch (error) {
          // NÃO faz logout aqui - apenas limpa token inválido
          localStorage.removeItem('token');
          this.isAuthenticatedSignal.set(false);
        }
      } else {
        this.isAuthenticatedSignal.set(false);
      }
    }
  }

  login(token: string, refreshToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.setCookie('refreshToken', refreshToken, 7);
      console.log('🍪 RefreshToken salvo nos cookies');
      this.isAuthenticatedSignal.set(true);
    }
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getCookie('refreshToken');
      console.log('🍪 RefreshToken recuperado dos cookies:', !!token);
      return token;
    }
    return null;
  }

  updateToken(newToken: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', newToken);
      console.log('🔄 Token atualizado no localStorage');
      this.isAuthenticatedSignal.set(true);
    }
  }

  loginOAuth(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.isAuthenticatedSignal.set(true);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.clearTokens();
    }
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/login']);
  }

  // Método para limpar apenas localmente sem redirecionar
  clearTokensOnly(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.clearTokens();
    }
    this.isAuthenticatedSignal.set(false);
  }

  private clearTokens(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.deleteCookie('refreshToken');
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Math.floor(Date.now() / 1000);

          if (payload.exp && payload.exp > currentTime) {
            return token;
          } else {
            // Token expirado - retorna null mas NÃO limpa tudo
            console.log('🔶 Token expirado, mas mantendo refreshToken para renovação');
            return null;
          }
        } catch (error) {
          console.error('❌ Erro ao decodificar token:', error);
          // Token inválido - limpa apenas o token, mantém refreshToken
          localStorage.removeItem('token');
          return null;
        }
      }
    }
    return null;
  }

  private setCookie(name: string, value: string, days: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`;
    }
  }

  private getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  private deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  }
}

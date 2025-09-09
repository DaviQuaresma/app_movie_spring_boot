import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oauth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
    >
      <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Processando login...</h2>
        <p class="text-gray-600">Aguarde um momento enquanto finalizamos seu login.</p>
      </div>
    </div>
  `,
})
export class OAuthCallbackComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.processOAuthCallback();
  }

  private async processOAuthCallback() {
    try {
      const response = await fetch('http://localhost:8005/auth/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          this.authService.login(data.token, data.refreshToken);

          if (data.email) {
            localStorage.setItem('user', data.email);
          }

          this.router.navigate(['/movies']);
        } else {
          throw new Error('Token não encontrado na resposta');
        }
      } else {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro no OAuth callback:', error);
      this.router.navigate(['/login'], {
        queryParams: { error: 'oauth_failed' },
      });
    }
  }
}

import { Component, signal, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
})
export class LoginPage implements OnInit {
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);

  email = signal<string>('');
  password = signal<string>('');
  oauthError = signal<string>('');

  constructor(private route: Router) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['error'] === 'oauth_failed') {
        this.oauthError.set('Erro no login social. Tente novamente ou use email/senha.');
      }
    });
  }

  irParaCadastro() {
    this.route.navigate(['/register']);
  }

  setEmail(newEmail: string) {
    this.email.set(newEmail);
    this.oauthError.set('');
  }

  setPassword(newPassword: string) {
    this.password.set(newPassword);
    this.oauthError.set('');
  }

  login() {
    this.authService.logout();

    this.userService.Login(this.email(), this.password()).subscribe({
      next: (response) => {
        if (response.token && response.refreshToken) {
          this.authService.login(response.token, response.refreshToken);
          localStorage.setItem('user', response.email);
          this.route.navigate(['/movies']);
        } else {
          alert('Erro: Tokens não recebidos do servidor');
        }
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.message || 'Erro desconhecido no login';
        alert('Erro no login: ' + errorMessage);
      },
    });
  }

  loginWithGoogle() {
    this.oauthError.set('');
    try {
      window.location.href = 'http://localhost:8005/oauth2/authorization/google';
    } catch (error) {
      this.oauthError.set('Erro ao conectar com Google. Tente novamente.');
    }
  }

  loginWithGitHub() {
    this.oauthError.set('');
    try {
      window.location.href = 'http://localhost:8005/oauth2/authorization/github';
    } catch (error) {
      this.oauthError.set('Erro ao conectar com GitHub. Tente novamente.');
    }
  }
}

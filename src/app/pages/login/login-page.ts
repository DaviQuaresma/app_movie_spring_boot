import { Component, signal, inject } from '@angular/core';
import { UserService } from '../../../services/userService';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private userService = inject(UserService);
  private authService = inject(AuthService);

  email = signal<string>('');
  password = signal<string>('');

  constructor(private route: Router) {}

  irParaCadastro() {
    this.route.navigate(['/register']);
  }

  setEmail(newEmail: string) {
    this.email.set(newEmail);
  }

  setPassword(newPassword: string) {
    this.password.set(newPassword);
  }

  login() {
    const oldToken = localStorage.getItem('token');
    if (oldToken) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }

    const loginObservable = this.userService.Login(this.email(), this.password());

    loginObservable.subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.login(response.token);
          localStorage.setItem('user', response.email);

          const savedToken = localStorage.getItem('token');
          const authState = this.authService.isAuthenticated();

          if (savedToken) {
            this.route.navigate(['/movies']);
          } else {
            alert('Erro: Token não foi salvo. Verifique o console.');
          }
        } else {
          alert('Erro: Token não recebido do servidor');
        }
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.message || 'Erro desconhecido no login';
        alert('Erro no login: ' + errorMessage);
      },
      complete: () => {},
    });
  }
}

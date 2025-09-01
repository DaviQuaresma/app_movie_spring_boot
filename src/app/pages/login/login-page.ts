import { Component, signal } from "@angular/core";
import { authService } from "../../../services/api";
import { Router } from "@angular/router";

@Component({
  selector: 'login-page',
  templateUrl: './login-page.html',
})

export class LoginPage {
  email = signal<string>('');
  password = signal<string>('');

  constructor(private route: Router) {
  }

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
    authService.login(this.email(), this.password()).then(() => {
      console.log('Login successful');
      // Redirecionar para a página de filmes ou dashboard após login bem-sucedido
      this.route.navigate(['/movies']);
    }).catch((error: any) => {
      console.error('Login failed', error);
      // Aqui você pode exibir uma mensagem de erro para o usuário
      alert('Erro no login: ' + error.message);
    });
  }

}
import { Component, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { UserService } from "../../../services/userService";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";


@Component({
    selector: 'register-component',
    templateUrl: './register-component.html',
    imports: [FormsModule]
})

export class RegisterPage {
    private userService = inject(UserService);
    private authService = inject(AuthService);
    
    public email: string = '';
    public password: string = '';
    public fullname: string = '';

    constructor(private route: Router) {}

    voltarParaLogin() {
        this.route.navigate(['/login']);
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setFullname(fullname: string) {
        this.fullname = fullname;
    }

    createAccount() {
        if (!this.email || !this.password || !this.fullname) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        this.userService.Create(this.email, this.password, this.fullname).subscribe({
            next: (response) => {
                console.log('Conta criada com sucesso', response);
                alert('Conta criada com sucesso! Faça login para continuar.');
                this.route.navigate(['/login']);
            },
            error: (error) => {
                console.error('Erro ao criar conta:', error);
                alert('Erro ao criar conta: ' + error.message);
            }
        });
    }

}

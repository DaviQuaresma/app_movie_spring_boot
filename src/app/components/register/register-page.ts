import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { authService } from "../../../services/api";
import { Router } from "@angular/router";


@Component({
    selector: 'register-page',
    templateUrl: './register-page.html',
    imports: [FormsModule]
})

export class RegisterPage {
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
        try {
            if (this.email && this.password && this.fullname) {
                return authService.create(this.email, this.password, this.fullname);
            } else {
                throw new Error('Todos os campos são obrigatórios.');
            }
        } catch (error) {
            console.error('Erro ao criar conta:', error);
        }
        return;
    }

}

import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

interface LoginResponse {
  token: string;
  email: string;
  message?: string;
}

interface CreateResponse {
  message: string;
  email?: string;
}

interface MeResponse {
  id: number;
  email: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = inject(ApiService);

  Login(email: string, password: string) {
    return this.api.post<LoginResponse>('auth/login', { email, password });
  }

  Create(email: string, password: string, fullName: string) {
    return this.api.post<CreateResponse>('auth/signup', { email, password, fullName });
  }

  Me() {
    return this.api.get<MeResponse>('users/me');
  }
}

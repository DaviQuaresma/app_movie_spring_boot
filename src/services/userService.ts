import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

interface LoginResponse {
  token: string;
  refreshToken: string;
  status: number;
  email: string;
  message?: string;
}

interface LogoutResponse {
  message?: string;
}

interface RefreshResponse {
  token: string;
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
  
  Logout(refreshToken: string) {
    return this.api.post('auth/logout', { refreshToken });
  }

  Refresh(refreshToken: string) {
    return this.api.post<RefreshResponse>('auth/refresh', { refreshToken });
  }

  Create(email: string, password: string, fullName: string) {
    return this.api.post<CreateResponse>('auth/signup', { email, password, fullName });
  }

  Me() {
    return this.api.get<MeResponse>('users/me');
  }
}

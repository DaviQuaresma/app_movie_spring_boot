import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './header-component.html'
})
export class HeaderComponent {
  isMenuOpen = signal<boolean>(false);
  emailStorage = signal<string>('');

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Inicializar o email do localStorage apenas no browser
    if (isPlatformBrowser(this.platformId)) {
      const userEmail = localStorage.getItem('user');
      this.emailStorage.set(userEmail || 'Usuário');
    }
  }

  toggleMobileMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMobileMenu(): void {
    this.isMenuOpen.set(false);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMobileMenu();
  }

  logout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  get currentUser() {
    const email = this.emailStorage();
    return {
      name: email || 'Usuário',
      email: email || 'user@email.com',
      avatar: ''
    };
  }

  get userInitials(): string {
    const name = this.currentUser.name;
    if (!name || name === 'Usuário') {
      return 'US';
    }
    
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}

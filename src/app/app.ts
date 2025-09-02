import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { LoginPage } from './pages/login/login-page';
import { HeaderComponent } from './components/header/header-component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';
import { computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('app_movie_spring_boot');
  currentRoute = signal<string>('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });

    this.currentRoute.set(this.router.url);
  }

  showHeader = computed(() => {
    const route = this.currentRoute();
    const isAuthenticated = this.authService.isAuthenticated();
    
    const authRoutes = ['/login', '/register'];
    const isAuthRoute = authRoutes.some(authRoute => route.includes(authRoute));
    
    return !isAuthRoute && isAuthenticated;
  });
}

import { MoviePage } from './pages/movie/movie-page';
import { Routes } from '@angular/router';
import { AuthGuard } from '../middleware/middleware-guard';
import { OAuthCallbackComponent } from './components/oauth/oauth-component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register-component').then((m) => m.RegisterPage),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movie/movie-page').then((m) => m.MoviePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    loadComponent: () => import('./pages/statistics/statistics-page').then((m) => m.StatisticsPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'oauth-callback',
    loadComponent: () =>
      import('./components/oauth/oauth-component').then((m) => m.OAuthCallbackComponent),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

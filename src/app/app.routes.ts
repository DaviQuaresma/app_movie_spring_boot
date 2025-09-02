import { MoviePage } from './pages/movie/movie-page';
import { Routes } from '@angular/router';
import { AuthGuard } from '../middleware/middleware-guard';

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
    loadComponent: () =>
      import('./pages/movie/movie-page').then((m) => m.MoviePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics-page').then((m) => m.StatisticsPage),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

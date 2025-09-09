import { AuthService } from '../../services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../../services/userService';
import { isPlatformBrowser } from '@angular/common';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  const refreshToken = authService.getRefreshToken();

  const publicRoutes = ['/auth/login', '/auth/signup', '/movie/search'];
  const isPublicRoute = publicRoutes.some((route) => request.url.includes(route));

  if (!isPublicRoute) {
    if (authToken) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next(clonedRequest);
    }
    else if (refreshToken && !isRefreshing) {
      return handlePreemptiveRefresh(request, next, authService, refreshToken);
    }
  }

  return next(request);
};

function handlePreemptiveRefresh(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  refreshToken: string
): Observable<HttpEvent<unknown>> {
  if (isRefreshing) {
    return throwError(() => new Error('Refresh in progress'));
  }

  isRefreshing = true;
  const userService = inject(UserService);

  return userService.Refresh(refreshToken).pipe(
    switchMap((refreshResult: any) => {
      isRefreshing = false;

      if (refreshResult && refreshResult.token) {
        authService.updateToken(refreshResult.token);

        const clonedRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${refreshResult.token}`),
        });

        return next(clonedRequest);
      } else {
        authService.logout();
        return throwError(() => new Error('Token not found in refresh response'));
      }
    }),
    catchError((refreshError: any) => {
      isRefreshing = false;

      userService.Logout(refreshToken).subscribe({
        error: (err) => console.warn('Erro no logout backend:', err),
        complete: () => authService.logout(),
      });

      return throwError(() => refreshError);
    })
  );
}

export const unauthErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const userService = inject(UserService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.url && error.url.includes('/login') && error.status === 200) {
        const refreshToken = authService.getRefreshToken();

        if (refreshToken && !isRefreshing) {
          return handleTokenRefresh(req, next, authService, userService, refreshToken);
        } else {
          authService.logout();
          return throwError(() => new Error('Redirected to login'));
        }
      }

      if (
        error instanceof HttpErrorResponse &&
        !(req.url.includes('auth/login') || req.url.includes('auth/refresh')) &&
        (error.status === 401 || error.status === 403)
      ) {

        const refreshToken = authService.getRefreshToken();

        if (refreshToken && !isRefreshing) {
          return handleTokenRefresh(req, next, authService, userService, refreshToken);
        } else {
          authService.logout();
          return throwError(() => new Error('No refresh token available'));
        }
      }

      return throwError(() => error);
    })
  );
};

function handleTokenRefresh(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService,
  userService: UserService,
  refreshToken: string
): Observable<HttpEvent<unknown>> {
  isRefreshing = true;

  return userService.Refresh(refreshToken).pipe(
    switchMap((refreshResult: any) => {
      isRefreshing = false;

      if (refreshResult && refreshResult.token) {
        authService.updateToken(refreshResult.token);

        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${refreshResult.token}`),
        });

        return next(clonedReq);
      } else {
        authService.logout();
        return throwError(() => new Error('Token not found in refresh response'));
      }
    }),
    catchError((refreshError: any) => {
      isRefreshing = false;

      userService.Logout(refreshToken).subscribe({
        next: () => console.log('Logout no backend realizado'),
        error: (err) => console.warn('Erro no logout backend:', err),
        complete: () => authService.logout(),
      });

      return throwError(() => refreshError);
    })
  );
}

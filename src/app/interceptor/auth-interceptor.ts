import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  const publicRoutes = ['/auth/login', '/auth/signup', '/movie/search'];
  
  const isPublicRoute = publicRoutes.some(route => req.url.includes(route));
  
  if (!isPublicRoute && authToken) {
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(cloneReq);
  }

  return next(req);
};

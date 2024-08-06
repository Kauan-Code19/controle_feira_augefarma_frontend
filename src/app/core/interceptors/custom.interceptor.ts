import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = localStorage.getItem("token")
  const tokenExpiration = localStorage.getItem("tokenExpiration");

  let cloneAuthenticationReq = req;
  
  if (token && tokenExpiration) {
    const expirationDate = new Date(parseInt(tokenExpiration, 10))

    if (expirationDate > new Date()) {
      cloneAuthenticationReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }); 
    }

    return next(cloneAuthenticationReq);
  } else {
    localStorage.removeItem("token")
    localStorage.removeItem("tokenExpiration")

    router.navigateByUrl("/login")
  }

  return next(req);
};

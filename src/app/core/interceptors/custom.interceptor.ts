import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token")
  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  let cloneAuthenticationReq = req;
  
  if (token) {
    cloneAuthenticationReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(cloneAuthenticationReq);
};

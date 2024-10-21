import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = sessionStorage.getItem("token")
  const tokenExpiration = sessionStorage.getItem("tokenExpiration")

  let cloneAuthenticationReq = req

  // Check if token and token expiration date exist
  if (token && tokenExpiration) {
    const expirationDate = new Date(parseInt(tokenExpiration, 10))

    // Check if the token is not expired
    if (expirationDate > new Date()) {
      // Clone the request adding the authorization token
      cloneAuthenticationReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })

      return next(cloneAuthenticationReq) // Return the cloned request with the token
    }
  }

  // If the token is missing or expired, clear sessionStorage and redirect to login
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("tokenExpiration")
  router.navigateByUrl("/login")

  return next(req) // Return the original request (optional based on redirection logic)
}

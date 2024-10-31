import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, throwError } from 'rxjs'

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = ''

      // Check for client-side error
      if (error.error instanceof ErrorEvent) {
        errorMsg = `Client Error: ${error.error.message}`
        // Show the error in alert
        alert(errorMsg) // Use the alert service to show the error message
        return throwError(() => new Error(errorMsg))// Return early for client errors
      }

      // Handle server-side error
      errorMsg = `Server Error: ${error.status} - ${error.error.message}`
      // Show the error in alert
      alert(errorMsg) // Use the alert service to show the error message

      // Return the error to be handled if necessary
      return throwError(() => new Error(errorMsg))

    })
  )
}


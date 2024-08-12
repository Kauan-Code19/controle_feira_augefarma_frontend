import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';

      if (error.error instanceof ErrorEvent) {
        // Erro do lado do cliente
        errorMsg = `Client Error: ${error.error}`;
      } else {
        // Erro do lado do servidor
        errorMsg = `Server Error: ${error.status} - ${error.error}`;
        if (error.error && error.error.error) {
          // Use a mensagem específica do backend, se disponível
          errorMsg = error.error.error;
        }
      }

      // Exibe o alerta com a mensagem de erro
      window.alert(errorMsg);

      // Retorna o erro para que possa ser manipulado se necessário
      return throwError(() => new Error(errorMsg));
    })
  );
};


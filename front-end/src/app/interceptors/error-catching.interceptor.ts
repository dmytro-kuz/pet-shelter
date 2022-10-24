import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorMessageService } from '../shared/service/error-message.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(public errorMessageService: ErrorMessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorMessageService.showErrorMessage(error.status);
        throw error;
      }),
    );
  }
}

export const ErrorCatchingInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorCatchingInterceptor,
  multi: true,
};

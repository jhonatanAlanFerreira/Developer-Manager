import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  static loading = false;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    RequestInterceptor.loading = true;
    
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          RequestInterceptor.loading = false;
        }
        return event;
      })).pipe(
        catchError(e => {
          RequestInterceptor.loading = false;
          return throwError(e);
        })
      );;
  }
}

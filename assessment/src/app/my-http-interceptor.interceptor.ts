import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request here
    // For example, you can add headers or handle errors
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: '' // Example of adding an authorization header
      }
    });
    return next.handle(modifiedRequest);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
// import { AuthService } from './auth.service'; // Import your AuthService

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // Get the authentication token
//     // const authToken = this.authService.getAuthToken();
//     let authToken = localStorage.getItem('token')


//     // Clone the request and attach the token if available
//     if (authToken) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`
//         }
//         // setHeaders: {
//         //   Auth: `${authToken}`,
//         // },
//       });
//     }

//     // Pass the cloned request with the token to the next handler
//     return next.handle(request);
//   }
// }


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private kickOutMessages = ['Error: No auth token', `"refreshToken" must be a string`, `Please authenticate`];

  constructor(private router: Router, private authService: ApiService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = localStorage.getItem('token');

    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(request)
  }
}

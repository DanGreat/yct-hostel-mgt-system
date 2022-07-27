import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event) => (event instanceof HttpResponse ? "Successful" : ""),
        (err) => {
          const response = (err?.error?.detail) ? err.error.Message : null;
          this.handleServiceError(err.status, response);
        }
      )
    );
  }

  handleServiceError(status: number, errMessge?: string) {
    // You can choose to handle other error statuses here
    switch (status) {
      case 401:
        this.toastr.error(errMessge || 'You are unauthorized');
        this.router.navigate(['/login'])
        break;
      case 403:
        this.toastr.error(errMessge || 'Forbidden To Access Resource');
        break;
      case 404:
        this.toastr.error(errMessge || 'Resource Not Found');
        break;
      case 0:
        this.toastr.error(errMessge || 'Please Check Your Network Connection');
        break;
      case 503:
        this.toastr.error(errMessge || 'Service Unavailable, Please Try Again Later');
        break;
      case 504:
        this.toastr.error(errMessge || 'Gateway Timeout');
        break;
      case 500:
        this.toastr.error(errMessge || 'Internal Server Error, Please Try Again Later');
        break;
      default:
        break;
    }
  }
}

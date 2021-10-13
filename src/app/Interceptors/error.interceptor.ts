import { AccountService } from 'src/app/Services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService, private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof(error.error) === 'object') {
                this.messageService.add({severity: 'error', summary: 'Nad Request!', detail: error.statusText});
              } else {
                this.messageService.add({severity: 'error', summary: 'Bad Request!', detail: error.error});
              }
              break;
            case 401:
              this.messageService.add({severity: 'error', summary: 'Unauthorized', detail: error.error || 'Please login first!'});
              this.router.navigateByUrl('/account/login');
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}}
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.messageService.add({severity: 'error', summary: error.statusText, detail: 'Something unexpected went wrong!'});
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}
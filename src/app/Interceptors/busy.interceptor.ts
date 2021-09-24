import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {  finalize } from 'rxjs/operators';
import { BusyService } from '../Services/busy.service';

@Injectable()
export class BusyInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("product")) {
      this.busyService.busy();
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.idle();
      })
    )
  }
}

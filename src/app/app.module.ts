import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CanActivateGuard } from './Guards/can-activate.guard';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CanLoadGuard } from './Guards/can-load.guard';
import { CartModule } from './Cart/cart.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './Shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './Home/home.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ToastModule} from 'primeng/toast';

import {ScrollTopModule} from 'primeng/scrolltop';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorInterceptor } from './Interceptors/error.interceptor';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    ScrollTopModule,
    AppRoutingModule,
    FontAwesomeModule,
    HomeModule,
    SharedModule,
    CartModule,
    ToastModule,
    HttpClientModule,
    ConfirmDialogModule,
    FormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:50001"]
      },
    }),
  ],
  exports: [
    HomeModule,
    SharedModule,
    CartModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    CanLoadGuard,
    CanActivateGuard,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

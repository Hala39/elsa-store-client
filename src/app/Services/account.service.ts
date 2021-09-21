import { BasketService } from './basket.service';
import { MessageService } from 'primeng/api';
import { AppUser } from './../Models/AppUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UserInfo } from '../Models/UserInfo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.ApiUrl + 'account/';
  userIsLogged = new BehaviorSubject<boolean>(this.loggedIn);
  userIsLogged$ = this.userIsLogged.asObservable();

  constructor(private apiCaller: HttpClient, private jwtHelper: JwtHelperService, 
    private router: Router, private messageService: MessageService,
    private location: Location,
    private basketService: BasketService) { }

  logIn(appUser: AppUser, goBack: boolean) {
    return this.apiCaller.post<UserInfo>(this.baseUrl + 'login', appUser).pipe(
      map(response => {
        if (response) {
          this.setUserToken(response.token);
          this.userIsLogged.next(true);
          this.messageService.add({severity:'success', summary:'Welcome back ' + response.name, detail: "Let's shop!"});
          if (goBack === true) {
            this.location.back();
          }
        }
      })
    )
  }

  signUp(appUser: AppUser, goBack: boolean) {
    return this.apiCaller.post<UserInfo>(this.baseUrl + 'register', appUser).pipe(
      map(response => {
        if (response) {
          this.setUserToken(response.token);
          this.userIsLogged.next(true);
          this.messageService.add({severity:'success', summary:'Welcome ' + response.name, detail: "Account created successfully!"});
          if (goBack === true) {
            this.location.back();
          }
        } 
      })
    );
  }

  setUserToken(token: string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expirationDate', JSON.stringify(this.jwtHelper.getTokenExpirationDate(token)));
    this.basketService.getBasket().subscribe();
    this.refreshPage();
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/");
  }
  
  getExpiration() {
    return localStorage.getItem("expirationDate");
  } 

  refreshPage() {
    var currentRoute: string = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(()=>this.router.navigateByUrl(currentRoute));
  }

}

import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadGuard implements CanLoad {
  constructor(private accountService: AccountService, private router: Router, private messageService: MessageService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //check some condition  
      if (this.accountService.loggedIn === false)  {
        this.messageService.add({severity: 'warn', summary: 'Unauthorized', detail: 'Please login first!'});
        this.router.navigateByUrl("/account/login");
        return false;
    } 
    return true;
  }
}

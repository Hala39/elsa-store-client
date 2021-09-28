import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/Services/account.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 
 
@Injectable()
export class CanActivateGuard implements CanActivate {
 
    constructor(private router:Router, private accountService: AccountService, private messageService: MessageService) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (this.accountService.loggedIn === false)  {
            this.messageService.add({severity: 'warn', summary: 'Unauthorized', detail: 'Please login first!'});
            this.router.navigateByUrl("/account/login");
            return false;
        } 
        return true;
    }
 
}
import { AccountService } from 'src/app/Services/account.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 
 
@Injectable()
export class CanActivateGuard implements CanActivate {
 
    constructor(private router:Router, private accountService: AccountService) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (this.accountService.loggedIn === false)  {
            this.router.navigateByUrl("/");
            return false;
        } 
        return true;
    }
 
}
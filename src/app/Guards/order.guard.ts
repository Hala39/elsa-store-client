import { BasketService } from './../Services/basket.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(private basketService: BasketService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.basketService.orderItemsSource.value === null) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }
  
}

import { BasketService } from './basket.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PersonalInfo } from './../Models/PersonalInfo';
import { BasketItem } from './../Models/CustomerBasket';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Order, OrderItem } from '../Models/Order';
import { Address } from '../Models/Address';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.ApiUrl + 'order/';

  constructor(private apiCaller: HttpClient, private messageService: MessageService, 
  private basketService: BasketService,  
  private router: Router) { }


  placeOrder(personalInfo: PersonalInfo, address: Address, items: BasketItem[]) {
    const orderItems: OrderItem[] = this.mapBasketItemsToOrderItems(items);
      const order: Order = {
        personalInfo : personalInfo,
        address : address,
        items : orderItems,
        total : items.reduce((a, b) => (b.price * b.quantity) + a, 0)
      }
    return this.apiCaller.post<Order>(this.baseUrl, order).subscribe(
      res => {
        if (res) {
          items.forEach(item => {
            this.basketService.removeItemFromBasket(item, false).subscribe();
          });
          this.messageService.add({severity: 'success', summary: 'Awesome', detail: 'Your order is on the road!'});
          this.router.navigateByUrl("/order");
        }
      }
    );
  }

  getRecentOrders() {
    return this.apiCaller.get<Order[]>(this.baseUrl + 'recent').pipe(
      map(response => {
        return response;
      })
    ); 
  }

  getPendingOrders() {
    return this.apiCaller.get<Order[]>(this.baseUrl + 'pending').pipe(
      map(response => {
        return response;
      })
    ); 
  }

  mapBasketItemsToOrderItems(basketItems: BasketItem[]) : OrderItem[] {
    const orderItems: OrderItem[] = []; 

    basketItems.forEach(element => {
      var newOrderItem = new OrderItem();
      newOrderItem.colorName = element.colorName;
      newOrderItem.pictureUrl = element.pictureUrl;
      newOrderItem.price = element.price;
      newOrderItem.productName = element.productName;
      newOrderItem.quantity = element.quantity;
      newOrderItem.sizeName = element.sizeName;

      orderItems.push(newOrderItem);
    });

    return orderItems;

  }

  confirmOrderReceived(orderId: number) {
    return this.apiCaller.post<boolean>(this.baseUrl + 'confirm/'+ orderId.toString(), {}).pipe(
      map(
        res => {
          if (res === true) {
            this.messageService.add({severity: 'success', summary: 'Happy purchase!', detail: 'If satisfied please rates us a five stars store!'});
            this.refreshPage();
          }

          return res;
        }
      )
    )
  }

  clearRecentOrders() {
    return this.apiCaller.delete<boolean>(this.baseUrl).pipe(
      map(
        res => {
          if (res === true) {
            this.messageService.add({severity: 'success', summary: 'Everything is clear!', detail: 'Your recent orders are cleared!'});
            this.refreshPage();
          }
        }
      )
    )
  }

  refreshPage() {
    var currentRoute: string = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(()=>this.router.navigateByUrl(currentRoute));
  }

}


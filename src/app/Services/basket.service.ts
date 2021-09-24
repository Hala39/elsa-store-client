import { MessageService } from 'primeng/api';
import { BasketItem } from 'src/app/Models/CustomerBasket';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../Models/Product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.ApiUrl + 'basket/';

  shipping = 0;

  basketSource = new BehaviorSubject<BasketItem[]>(null);
  basket$ = this.basketSource.asObservable();

  orderItemsSource = new BehaviorSubject<BasketItem[]>(null);

  constructor(private apiCaller: HttpClient, private messageService: MessageService, private router: Router) { }

  getBasket() {
    return this.apiCaller.get<BasketItem[]>(this.baseUrl).pipe(
      map(
        res => {
          this.basketSource.next(res);
          this.setLocalBasket(res);
        }
      )
    );
  }

  getLocalBasket() : BasketItem[] {
    const basket = JSON.parse(localStorage.getItem('basket'));
    this.basketSource.next(basket);
    if (basket === null) {
      this.getBasket().subscribe();
    }
    return basket;
  }

  setLocalBasket(basket: BasketItem[]) {
    localStorage.setItem('basket', JSON.stringify(basket));
    this.basketSource.next(basket);
    this.refreshPage();
  }

  addItemToBasket(item: Product, quantity = 1, size: any, color: any, pictureUrl: string) {
    const itemToAdd: BasketItem = this.mapProductItemToBasketItem(item, quantity, size, color, pictureUrl);
    const basket = this.getLocalBasket();
    if (basket === null) {
      return this.addItem(itemToAdd).subscribe(
        (response: BasketItem) => {
          if (response) {
            basket.push(response);
            this.setLocalBasket(basket);
            this.messageService.add({severity: 'success', summary:'Awesome!', detail: 'Item is added successfully!'});
          } else {
            this.messageService.add({severity: 'warn', summary: 'Something went wrong!',detail: 'Unable to add item'});
          }
        }
      );
    }
    return this.addOrUpdateItem(basket, itemToAdd);
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem) {
    const index = 
    items.findIndex(x => x.productName === itemToAdd.productName
      && x.colorName === itemToAdd.colorName 
      && x.sizeName === itemToAdd.sizeName
    );
    if(index === -1) {
      this.addItem(itemToAdd).subscribe(
        (response: BasketItem) => {
          if (response) {
            var basket = this.getLocalBasket();
            basket.push(response);
            this.setLocalBasket(basket);
            this.messageService.add({severity: 'success', summary:'Awesome!', detail: 'Item is added successfully!'});
          } else {
            this.messageService.add({severity: 'warn', summary: 'Something went wrong!',detail: 'Unable to add item'});
          }
        }
      );
    }
    else {
      this.updateItem(itemToAdd).subscribe();
    } 
  }

  addItem(item: BasketItem) {
    return this.apiCaller.post<BasketItem>(this.baseUrl, item);
  }

  removeItemFromBasket(item: BasketItem, toast: boolean) {
    var basket = this.getLocalBasket();
    basket = basket.filter(i => i.id !== item.id);
    return this.apiCaller.delete<boolean>(this.baseUrl + item.id.toString()).pipe(
      map(
        response => {
          if (response === true) {
            this.setLocalBasket(basket);
            if (toast === true) {
              this.messageService.add({severity: 'success', summary: 'Success', detail: 'Item is deleted'});
            }
          } else {
            if (toast === true) {
              this.messageService.add({severity: 'warn', summary: 'Something went wrong!',detail: 'Unable to remove item'});
            }
          }
        }
      ) 
    );
  }

  updateItem(item: BasketItem) {
    var basket = this.getLocalBasket();
    const specificItem = basket.find(x => x.productName === item.productName);
    specificItem.quantity += item.quantity;
    return this.apiCaller.put<boolean>(this.baseUrl, specificItem).pipe(
      map(
        res => {
          if (res === true) {
            this.setLocalBasket(basket);
            this.messageService.add({severity: 'success', summary:'Awesome!', detail: 'Item is updated successfully!'});
          } else {
            this.messageService.add({severity: 'warn', summary: 'Something went wrong!',detail: 'Unable to add item'});
          }
        }
      )
    );
  }

  decrementItemQuantity(item: BasketItem) {
    const basket = this.getLocalBasket ();
    const foundItemIndex = basket.findIndex(x =>  x.colorName === item.colorName 
      && x.productName === item.productName && x.sizeName === item.sizeName);
    basket[foundItemIndex].quantity--;
      return this.apiCaller.put<boolean>(this.baseUrl, item).pipe(
        map(
          response => {
            if (response === true) {
              this.setLocalBasket(basket);
            }
          }
        )
      );
  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getLocalBasket ();
    const foundItemIndex = basket.findIndex(x =>  x.colorName === item.colorName 
      && x.productName === item.productName && x.sizeName === item.sizeName);
    basket[foundItemIndex].quantity++;
    return this.apiCaller.put<boolean>(this.baseUrl, item).pipe(
      map(
        response => {
          if (response === true) {
            this.setLocalBasket(basket);
          }
        }
      )
    );
  }

  private mapProductItemToBasketItem(item: Product, quantity: number, size: any, color: any, pictureUrl: string) : BasketItem {
    return {
      id: item.id,
      productName: item.name,
      colorName: color,
      sizeName: size,
      pictureUrl: pictureUrl,
      quantity,
      price: item.price
    }
  }

  refreshPage() {
    var currentRoute: string = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(()=>this.router.navigateByUrl(currentRoute));
  }

}

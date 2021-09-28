import { BasketService } from './../Services/basket.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Color } from '../Models/Color';
import { BasketItem } from '../Models/CustomerBasket';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  item: BasketItem;
  items: BasketItem[] = [];

  productDialog: boolean = false;

  selectedItems: BasketItem[] = [];
  
  submitted: boolean = false;

  selectedColor: Color;
  colors: Color[] = [];

  basket$ : Observable<BasketItem[]>;

  constructor(private messageService: MessageService, private router: Router,
    private confirmationService: ConfirmationService, private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.getLocalBasket();
    this.getBasket();
    window.scrollTo(0,0);
  }

  getBasket() {
    this.basket$ = this.basketService.basket$;
  }

  getTotal(basket: BasketItem[]) : number {
    const total = basket.reduce((a,b) => b.price * b.quantity + a, 0);
    return total;
  }

  incrementItemQuantity(item: BasketItem) {
    if (item.quantity < 5) {
      this.basketService.incrementItemQuantity(item).subscribe();
    } else {
      this.messageService.add({severity: 'warn', summary: 'Maximum exceeded', detail: 'You can not add more than 5 pieces to your basket!'});
    }
  }

  decrementItemQuantity(item: BasketItem) {
    if (item.quantity > 1) {
      this.basketService.decrementItemQuantity(item).subscribe();
    }
  }
    
  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected items?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.selectedItems.forEach(element => {
                this.basketService.removeItemFromBasket(element, false).subscribe();
            });
            this.items = this.items.filter(val => !this.selectedItems.includes(val));
            this.selectedItems = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'items Deleted', life: 3000});
        }
    });
  }

  deleteItem(item: BasketItem) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + item.productName + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.basketService.removeItemFromBasket(item, true).subscribe();
          this.items = this.items.filter(x => x.id === item.id);
        }
    });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  order() {
    const items = this.selectedItems;
    this.basketService.orderItemsSource.next(items);
    this.router.navigateByUrl("/order/place");
  }
  
 
}   


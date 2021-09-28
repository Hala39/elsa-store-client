import { OrderItem } from './../../Models/Order';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { OrderService } from './../../Services/order.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input() orders: Order[];
  @Input() pending: boolean;

  constructor(private orderService: OrderService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  confirmOrder(orderId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to confirm receiving the order?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.confirmOrderReceived(orderId).subscribe();
      }
    })
  }

  clearRecentOrders() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to clear your recent orders list?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.clearRecentOrders().subscribe();
      }
    })
  }

  deleteItem(order: Order) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this order?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.orderService.deleteRecentOrder(order.id).subscribe();
      }
    })
  }

}


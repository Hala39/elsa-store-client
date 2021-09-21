import { OrderItem } from './../../Models/Order';
import { MenuItem, MessageService } from 'primeng/api';
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

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  confirmOrder(orderId: number) {
    this.orderService.confirmOrderReceived(orderId).subscribe();
  }

  clearRecentOrders() {
    this.orderService.clearRecentOrders().subscribe();
  }

  isFirstElement(order: Order, orders: Order[]) : boolean {
    if (orders[0] === order) {
      return true;
    }

    return false;
  }

}


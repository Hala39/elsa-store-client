import { Observable } from 'rxjs';
import { OrderService } from './../../Services/order.service';
import { Order } from './../../Models/Order';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  activeIndex = 0;
  pendingOrders: Order[] = [];
  recentOrders: Order[] = [];
  
  constructor(private orderService: OrderService) { 
    
  }

  ngOnInit(): void {
    this.getPendingOrders();
    this.getRecentOrders();
  }

  getPendingOrders() {
    return this.orderService.getPendingOrders().subscribe(
      res => {
        this.pendingOrders = res;
      }
    )
  }

  getRecentOrders() {
    this.orderService.getRecentOrders().subscribe(
      res => {
        this.recentOrders = res;
      }
    )
  }



}

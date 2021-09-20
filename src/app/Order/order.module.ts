import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderCardComponent } from './order-card/order-card.component';

const routes : Routes = [
  { path: '', component: MyOrdersComponent },
  { path: 'place', component: OrderComponent}
]
@NgModule({
  declarations: [
    OrderComponent,
    MyOrdersComponent,
    OrderCardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StepsModule,
    CardModule,
    TabViewModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }

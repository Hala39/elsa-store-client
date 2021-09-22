import { SharedModule } from './../Shared/shared.module';
import { TableModule } from 'primeng/table';
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
import { AccordionModule } from 'primeng/accordion';
import { InplaceModule } from 'primeng/inplace';
import {DividerModule} from 'primeng/divider';
import { Routes, RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { CanActivateGuard } from '../Guards/can-activate.guard';

const routes : Routes = [
  { path: '', component: MyOrdersComponent, canActivate: [CanActivateGuard] },
  { path: 'place', component: OrderComponent, canActivate: [CanActivateGuard]}
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
    InplaceModule,
    AccordionModule,
    DropdownModule,
    PanelModule,
    SharedModule,
    MenuModule,
    DividerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderModule { }

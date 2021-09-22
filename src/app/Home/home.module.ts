import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import {MegaMenuModule} from 'primeng/megamenu';
import {CarouselModule} from 'primeng/carousel';

import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../Shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [
  { path: '', component: ProductsComponent}
]
@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MegaMenuModule,
    CarouselModule,
    ButtonModule,
    DataViewModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }

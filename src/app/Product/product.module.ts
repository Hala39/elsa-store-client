import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { Routes, RouterModule } from '@angular/router';

import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {ToolbarModule} from 'primeng/toolbar';

const routes : Routes = [
  {path: '', component: ProductComponent}
]

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }

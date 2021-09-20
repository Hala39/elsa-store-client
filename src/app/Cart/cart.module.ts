import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CartComponent } from './cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes : Routes = [
  {path: '', component: CartComponent}
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    TableModule,
		DialogModule,
		MultiSelectModule,
    ToolbarModule,
		DropdownModule,
		ButtonModule,
    InputTextModule,
    HttpClientModule,
    FormsModule,
    InputNumberModule,
    ConfirmDialogModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    
  ]
})
export class CartModule { }

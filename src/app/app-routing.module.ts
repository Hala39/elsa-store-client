import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './Home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from './Guards/can-load.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', loadChildren: () => import('../app/Product/product.module')
      .then(m => m.ProductModule),
  },
  { path: 'cart', loadChildren: () => import('../app/Cart/cart.module')
      .then(m => m.CartModule),
      canLoad: [CanLoadGuard],
  },
  {
    path: 'order', loadChildren: () => import('../app/Order/order.module')
      .then(m => m.OrderModule),
      canLoad: [CanLoadGuard],
  },
  { path: 'account', loadChildren: () => import('../app/Account/account.module')
      .then(m => m.AccountModule)
  },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', component: HomeComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

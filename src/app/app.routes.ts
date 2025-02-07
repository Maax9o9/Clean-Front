import { Routes } from '@angular/router';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ProductComponent } from './components/products/products.component';

export const routes: Routes = [
  { path: 'orders', component: OrderStatusComponent },
  { path: 'products', component: ProductComponent },
  { path: '**', redirectTo: 'orders' } 
];

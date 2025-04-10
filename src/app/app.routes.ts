import { Routes } from '@angular/router';
import { OrderStatusComponent } from './features/orders/presentation/components/order-status.component';
import { ProductsComponent } from './features/products/presentation/components/products.component';
export const routes: Routes = [
  { path: 'orders', component: OrderStatusComponent },
  { path: 'products', component: ProductsComponent },
  { path: '**', redirectTo: 'orders' } 
];

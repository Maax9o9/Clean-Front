import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

import { OrderService } from './features/orders/data/repository/order.service';
import { ProductService } from './features/products/data/repository/product.service';
import { ProductsComponent } from './features/products/presentation/components/products.component';
import { OrderStatusComponent } from './features/orders/presentation/components/order-status.component';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NgIf,
    NgFor,
    MatDividerModule,
    DecimalPipe,
    OrderStatusComponent,
    ProductsComponent,
    MatOption,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [OrderService, ProductService], 
})
export class AppComponent {
  title = 'Abarrotes';
}

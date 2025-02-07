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

import { OrderService } from './services/order.service';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { ProductComponent } from './components/products/products.component';
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
    ProductComponent,
    MatOption,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [OrderService] 
})
export class AppComponent {
  title = 'Abarrotes';
}

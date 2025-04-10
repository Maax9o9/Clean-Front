import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../data/repository/order.service';
import { Order } from '../../data/models/order.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  providers: [OrderService]
})
export class OrderStatusComponent implements OnInit {
  orders: Order[] = [];
  orderId: number = 0;
  order: Order | null = null;
  statuses: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  createOrder(): void {
    const newOrder: Order = {
      ID: 0,
      OrderDate: new Date(),
      Status: this.statuses[0],
    };
    this.orderService.createOrder(newOrder).subscribe(order => {
      this.orders.push(order);
    });
  }

  updateOrderStatus(): void {
    if (this.order) {
      this.orderService.updateOrder(this.order.ID, this.order).subscribe(() => {
        console.log('Order status updated');
      });
    }
  }

  deleteOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => {
      this.orders = this.orders.filter(o => o.ID !== id);
    });
  }
}
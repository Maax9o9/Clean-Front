import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../data/models/order.model';
import { OrderService } from '../data/repository/order.service';

@Injectable()
export class OrderUseCase {
  constructor(private orderService: OrderService) {}

  getAllOrders(): Observable<Order[]> {
    return this.orderService.getOrders();
  }

  createNewOrder(order: Order): Observable<Order> {
    return this.orderService.createOrder(order);
  }

  updateOrderStatus(orderId: number, order: Order): Observable<Order> {
    return this.orderService.updateOrder(orderId, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.orderService.deleteOrder(orderId);
  }
}
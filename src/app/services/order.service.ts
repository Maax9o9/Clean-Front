import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/orders'; 

  constructor(private http: HttpClient) {}

  createOrder(orderData: Order): Observable<Order> {
    const orderPayload = {
      ID: orderData.ID,
      OrderDate: orderData.OrderDate.toISOString(), 
      Status: orderData.Status 
    };
    console.log('Orden a enviar:', orderPayload); 
  
    return this.http.post<Order>(this.apiUrl, orderPayload);
  }
  
  
  getOrderStatus(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}/status`);
  }

  waitForOrderUpdate(orderId: number, currentStatus: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}/wait?current=${currentStatus}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.apiUrl}/${orderId}`, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }
}

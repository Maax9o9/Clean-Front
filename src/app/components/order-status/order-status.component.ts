import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MatDivider } from '@angular/material/divider';
import { MatOption } from '@angular/material/core';
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
    MatDivider,
    FormsModule,
    MatOption,
    MatSelectModule
  ],
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  providers: [OrderService]
})

export class OrderStatusComponent {
  orderId: number = 0;
  order: Order = { ID: 0, OrderDate: new Date(), Status: 'Enviado' };
  newOrder: Order = {ID: 0,OrderDate: new Date(), Status: 'Enviado' };
  orders: Order[] = [];
  pollingInterval: any;
  
  statuses = ['Enviado', 'En Camino', 'Entregado'];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders(); 
  }

  getOrderStatus(): void {
    if (this.orderId <= 0) return;

    this.orderService.getOrderStatus(this.orderId).subscribe(order => {
      console.log('Datos recibidos para el estado de la orden:', order);  
      
      this.order = { 
        ID: order.ID, 
        OrderDate: new Date(order.OrderDate), 
        Status: order.Status 
      }; 
    }, error => {
      console.error('Error al obtener el estado de la orden:', error);  
    });
  }

  waitForOrderUpdate(): void {
    if (!this.order || this.orderId <= 0) return;

    this.orderService.waitForOrderUpdate(this.orderId, this.order.Status).subscribe(order => {
      this.order = order;
      alert(`El estado ha cambiado a: ${this.order.Status}`);
    });
  }

  startShortPolling(): void {
    this.stopPolling();
    this.getOrderStatus();
    this.pollingInterval = setInterval(() => {
      this.getOrderStatus();
    }, 5000);
  }

  stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  createOrder(): void {
    console.log('Antes de enviar:', this.newOrder); 
    
    if (!this.newOrder.Status) {
      alert('Por favor, selecciona un estado antes de crear la orden.');
      return;
    }
  
    this.orderService.createOrder(this.newOrder).subscribe(newOrder => {
      console.log('Orden creada con éxito:', newOrder);
      this.orders.push(newOrder);
      this.newOrder = { ID: 0, OrderDate: new Date(), Status: '' };
      alert('Orden creada con éxito');
    }, error => {
      console.error('Error al crear la orden:', error);
    });
  }
 
  updateOrderStatus(): void {
    if (!this.orderId || this.orderId <= 0) {
      alert('Por favor, ingrese un ID de orden válido.');
      return;
    }
  
    this.orderService.getOrders().subscribe(orders => {
      const existingOrder = orders.find(order => order.ID === this.orderId);
  
      if (!existingOrder) {
        alert('Error: La orden con este ID no existe.');
        return;
      }
  
      const orderData = {
        id: this.orderId,
        status: this.order.Status
      };
  
      console.log("Orden a actualizar: ", orderData);
  
      this.orderService.updateOrder(orderData.id, { 
        ID: orderData.id, 
        OrderDate: new Date(), 
        Status: orderData.status 
      }).subscribe(response => {
        console.log('Orden actualizada con éxito', response);
        alert('Orden actualizada con éxito.');
      }, error => {
        console.error('Error al actualizar la orden:', error);
        alert('Hubo un error al actualizar la orden.');
      });
  
    }, error => {
      console.error('Error al obtener las órdenes:', error);
      alert('Error al obtener las órdenes. Intente nuevamente.');
    });
  }
  

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(() => {
      this.orders = this.orders.filter(order => order.ID !== orderId); 
      alert('Orden eliminada con éxito');
    });
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe(orders => {
      console.log('Órdenes completas:', orders);  
      
      this.orders = orders.map(order => {
        console.log('Orden individual:', order);
        
        return {
          ID: order.ID,
          OrderDate: new Date(order.OrderDate), 
          Status: order.Status
        };
      });
    });
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();  
  }
}

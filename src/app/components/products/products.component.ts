import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDivider,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  productId: number = 0;
  product = { ID: 0, Name: '', Price: 0 };
  newProduct = { ID: 0, Name: '', Price: 0 };
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    if (this.productId <= 0) return;
    this.productService.getProducts(this.productId).subscribe(products => {
      if (products.length > 0) {
        this.product = { ID: products[0].ID, Name: products[0].Name, Price: products[0].Price };
      }
    }, error => {
      console.error('Error al obtener el producto:', error);
    });
  }

  addProduct(): void {
    if (!this.newProduct.Name || this.newProduct.Price <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe(newProduct => {
      this.products.push(newProduct);
      this.newProduct = { ID: 0, Name: '', Price: 0 };
      alert('Producto creado con éxito');
    }, error => {
      console.error('Error al crear el producto:', error);
    });
  }

  updateProduct(): void {
    if (this.productId && this.product.Name && this.product.Price > 0) {
      this.productService.updateProduct(this.productId, this.product).subscribe(response => {
        console.log('Producto actualizado', response);
      });
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.ID !== productId);
      alert('Producto eliminado con éxito');
    });
  }

}

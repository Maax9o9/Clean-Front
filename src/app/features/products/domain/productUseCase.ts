import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data/models/product.model';
import { ProductService } from '../data/repository/product.service';

@Injectable()
export class ProductUseCase {
  constructor(private productService: ProductService) {}

  getAllProducts(): Observable<Product[]> {
    return this.productService.getProducts();
  }

  createNewProduct(product: Product): Observable<Product> {
    return this.productService.addProduct(product);
  }

  updateProductDetails(productId: number, product: Product): Observable<Product> {
    return this.productService.updateProduct(productId, product);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.productService.deleteProduct(productId);
  }
}
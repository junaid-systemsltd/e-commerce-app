import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct, TProduct } from 'src/types/product.types';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Products
  productsSub = new BehaviorSubject<TProduct>([]);
  productsErrorSub = new BehaviorSubject<string>('');
  productsLoadingSub = new BehaviorSubject<boolean>(true);

  // Product
  productSub = new BehaviorSubject<IProduct | null>(null);
  productErrorSub = new BehaviorSubject<string>('');
  productLoadingSub = new BehaviorSubject<boolean>(false);

  constructor(private productApi: ProductApiService) {}

  // Products Methods
  getProductsApi() {
    this.productApi.products().subscribe({
      next: (products) => {
        this.productsSub.next(products);
        this.productsLoadingSub.next(false);
      },
      error: (error) => {
        const message = error.error.message;
        this.productsErrorSub.next(message);
        this.productsLoadingSub.next(false);
      },
    });
  }
  getProducts(): Observable<TProduct> {
    return this.productsSub.asObservable();
  }

  getProductsError(): Observable<string> {
    return this.productsErrorSub.asObservable();
  }

  getProductsLoader(): Observable<boolean> {
    return this.productsLoadingSub.asObservable();
  }

  // Product Method
  getProductByIdApi(id: string) {
    this.productLoadingSub.next(true);
    this.productApi.productsById(id).subscribe({
      // OnSuccess Handler
      next: (product) => {
        this.productSub.next(product);
        this.productLoadingSub.next(false);
      },
      // OnError Handler
      error: (error: HttpErrorResponse) => {
        this.productErrorSub.next(error.error.message);
        this.productLoadingSub.next(false);
      },
    });
  }

  getProductError(): Observable<string> {
    return this.productErrorSub.asObservable();
  }

  getProductLoader(): Observable<boolean> {
    return this.productLoadingSub.asObservable();
  }
}

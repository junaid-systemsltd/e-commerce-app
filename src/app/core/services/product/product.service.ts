import { Injectable } from '@angular/core';
import { ProductApiService } from './product-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TProduct } from 'src/types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private productApi: ProductApiService) {
    this.productApi.getAll().subscribe({
      next: (products) => {
        this.productSubject.next(products);
        this.loadingSubject.next(false);
      },
      error: (error) => {
        const message = error.error.message;
        this.errorSubject.next(message);
        this.loadingSubject.next(false);
      },
    });
  }

  productSubject = new BehaviorSubject<TProduct>([]);
  errorSubject = new BehaviorSubject<string>('');
  loadingSubject = new BehaviorSubject<boolean>(true);

  getProducts(): Observable<TProduct> {
    return this.productSubject.asObservable();
  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  getLoader(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BASE_URL,
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_PRODUCT_ENDPOINT,
} from 'src/app/constants/api.constant';
import { IProduct } from 'src/types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  constructor(private http: HttpClient) {}

  products(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(GET_ALL_PRODUCTS_ENDPOINT);
  }

  productsById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${GET_PRODUCT_ENDPOINT}/${id}`);
  }
}

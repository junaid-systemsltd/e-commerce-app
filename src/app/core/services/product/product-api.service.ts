import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BASE_URL,
  GET_ALL_PRODUCTS_ENDPOINT,
} from 'src/app/constants/api.constant';
import { IProduct } from 'src/types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    const endpoint = BASE_URL + GET_ALL_PRODUCTS_ENDPOINT;
    return this.http.get<IProduct[]>(endpoint);
  }
}

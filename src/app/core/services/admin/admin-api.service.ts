import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GET_ALL_PRODUCTS_ENDPOINT,
  GET_ALL_USERS_ENDPOINT,
} from 'src/app/constants/api.constant';
import { IProduct } from 'src/types/product.types';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any>(GET_ALL_USERS_ENDPOINT);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<IProduct[]>(GET_ALL_PRODUCTS_ENDPOINT);
  }
}

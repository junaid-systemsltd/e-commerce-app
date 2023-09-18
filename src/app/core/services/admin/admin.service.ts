import { Injectable } from '@angular/core';
import { AdminApiService } from './admin-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private adminApi: AdminApiService) {}
  // Products Subject
  productsSubject = new BehaviorSubject([]);
  productsLoadingSubject = new BehaviorSubject(false);
  productsErrorSubject = new BehaviorSubject('');

  // Users Subject
  usersSubject = new BehaviorSubject([]);
  usersLoadingSubject = new BehaviorSubject(false);
  usersErrorSubject = new BehaviorSubject('');

  // Users Methods
  getUsersApi() {
    this.usersLoadingSubject.next(true);
    this.adminApi.getAllUsers().subscribe({
      next: (users) => {
        this.usersSubject.next(users);
        this.usersLoadingSubject.next(false);
      },
      error: (error: HttpErrorResponse) => {
        this.usersErrorSubject.next(error.error.message);
        this.usersLoadingSubject.next(false);
      },
    });
  }

  getUsersList(): Observable<any> {
    return this.usersSubject.asObservable();
  }
  getUsersApiError(): Observable<string> {
    return this.usersErrorSubject.asObservable();
  }
  getUsersApiLoading(): Observable<boolean> {
    return this.usersLoadingSubject.asObservable();
  }

  // Products Methods
  getProductsApi() {
    this.productsLoadingSubject.next(true);
    this.adminApi.getAllProducts().subscribe({
      next: (products) => {
        this.productsSubject.next(products);
        this.productsLoadingSubject.next(false);
      },
      error: (error: HttpErrorResponse) => {
        this.productsErrorSubject.next(error.error.message);
        this.productsLoadingSubject.next(false);
      },
    });
  }

  getProductsList(): Observable<any> {
    return this.productsSubject.asObservable();
  }
  getProductsApiError(): Observable<string> {
    return this.productsErrorSubject.asObservable();
  }
  getProductsApiLoading(): Observable<boolean> {
    return this.productsLoadingSubject.asObservable();
  }
}

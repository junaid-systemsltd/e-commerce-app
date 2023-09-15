import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, UserT } from 'src/types/user.types';
import { UserApiService } from './user-api.service';
import { LoginResponse } from 'src/types/api.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userApi: UserApiService) {}
  userSubject = new BehaviorSubject<UserT>(this.getUserFromLocalStorage());
  errorSubject = new BehaviorSubject<string>('');

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): Observable<UserT> {
    return this.userSubject.asObservable();
  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(email: string, password: string): any {
    this.userApi.loginUser(email, password).subscribe({
      // Success Handler
      next: (data: LoginResponse) => {
        const user: IUser = { ...data, email };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      },
      // Error Handler
      error: (error: HttpErrorResponse) => {
        this.errorSubject.next(error.error.message);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  private getUserFromLocalStorage(): UserT {
    console.log('getUserFromLocalStorage');
    if (localStorage.getItem('user') !== null) {
      const userItem = localStorage.getItem('user');
      const user = userItem && JSON.parse(userItem);
      return user;
    }

    return null;
  }
}

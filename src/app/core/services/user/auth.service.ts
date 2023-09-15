import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/types/user.types';
import { UserApiService } from './user-api.service';
import { LoginResponse } from 'src/types/api.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userApi: UserApiService) {}
  userSubject = new BehaviorSubject<IUser | null>(
    this.getUserFromLocalStorage()
  );

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  /**
   *  Login the user then tell all the subscribers about the new status
   */
  login(email: string, password: string): any {
    let error = '';

    this.userApi.loginUser(email, password).subscribe({
      // Success Handler
      next: (data: LoginResponse) => {
        this.userSubject.next({ ...data, email });
        console.log({ data });
      },
      // Error Handler
      error: (error: HttpErrorResponse) => {
        error = error.error.message;
      },
    });

    return error;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  private getUserFromLocalStorage(): IUser | null {
    if (localStorage.getItem('user') !== null) {
      const userItem = localStorage.getItem('user');
      console.log({ userItem });

      const user = userItem && JSON.parse(userItem);
      console.log({ user }, '#######');

      return user;
    }

    return null;
  }
}

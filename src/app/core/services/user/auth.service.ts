// Libs
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// Custom Modules
import { User, UserT } from 'src/types/user.types';
import { UserApiService } from './user-api.service';
import { LoginResponse, ProfileApiResponse } from 'src/types/api.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userApi: UserApiService) {}
  userSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage()
  );
  errorSubject = new BehaviorSubject<string>('');

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }

  login(email: string, password: string): any {
    this.userApi.loginUser(email, password).subscribe({
      /* Login Api Success Handler */
      next: (data: LoginResponse) => {
        /* Headers for Profile Api */
        const headers = new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.access_token}`,
        });

        this.userApi.profile(headers).subscribe({
          /* Profile Api Success Handler */
          next: (user: ProfileApiResponse) => {
            const { email, role, name } = user;
            const { access_token, refresh_token } = data;

            const updatedUser: User = {
              email,
              role,
              name,
              access_token,
              refresh_token,
            };

            localStorage.setItem('user', JSON.stringify(updatedUser));
            this.userSubject.next(updatedUser);
          },
          /* Profile Api Error Handler */
          error: (error: HttpErrorResponse) => {
            this.errorSubject.next(error.error.message);
          },
        });
      },

      /* Login Error Handler */
      error: (error: HttpErrorResponse) => {
        this.errorSubject.next(error.error.message);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  private getUserFromLocalStorage(): User | null {
    if (localStorage.getItem('user') !== null) {
      const userItem = localStorage.getItem('user');
      const user = userItem && JSON.parse(userItem);
      return user;
    }

    return null;
  }
}

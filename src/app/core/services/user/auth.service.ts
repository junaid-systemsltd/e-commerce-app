// Libs
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// Custom Modules
import { User } from 'src/types/user.types';
import { UserApiService } from './user-api.service';
import {
  LoginResponse,
  ProfileApiResponse,
  RegisterUser,
} from 'src/types/api.types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userApi: UserApiService, private router: Router) {}
  loginUser = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  loginError = new BehaviorSubject<string>('');
  loginLoading = new BehaviorSubject<boolean>(false);

  registerLoading = new BehaviorSubject<boolean>(false);
  registerError = new BehaviorSubject<string>('');

  isLoggedIn(): boolean {
    return !!this.loginUser.value;
  }

  isAdmin(): boolean {
    return this.loginUser.value?.role === 'admin';
  }

  getUser(): Observable<User | null> {
    return this.loginUser.asObservable();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loginUser.next(null);
  }

  private getUserFromLocalStorage(): User | null {
    if (localStorage.getItem('user') !== null) {
      const userItem = localStorage.getItem('user');
      const user = userItem && JSON.parse(userItem);
      return user;
    }

    return null;
  }

  /* LOGIN API METHOD */
  loginApi(email: string, password: string): any {
    this.loginLoading.next(true);
    this.userApi.loginUser(email, password).subscribe({
      /* On Success Handler */
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
            this.loginUser.next(updatedUser);
            this.loginLoading.next(false);
            this.router.navigate(['']);
            this.registerLoading.next(true);
          },
          /* Profile Api Error Handler */
          error: (error: HttpErrorResponse) => {
            this.loginError.next(error.error.message);
          },
        });
      },

      /* On Error Handler */
      error: (error: HttpErrorResponse) => {
        this.loginError.next(error.error.message);
        this.loginLoading.next(false);
      },
    });
  }

  getLoginErrorApi(): Observable<string> {
    return this.loginError.asObservable();
  }

  getLoginApiLoading(): Observable<boolean> {
    return this.loginLoading.asObservable();
  }

  /* REGISTER API METHOD */
  registerUserApi(data: RegisterUser) {
    this.registerLoading.next(true);
    this.userApi.registerUser(data).subscribe({
      // On Success Handler
      next: () => {
        this.loginApi(data.email, data.password);
      },
      // On Error Handler
      error: (error: HttpErrorResponse) => {
        const errors = error.error.message;
        const hasMultiError = Array.isArray(errors);

        const errorMessage = hasMultiError ? errors.join(',') : errors;
        this.registerError.next(errorMessage);
        this.registerLoading.next(false);
      },
    });
  }

  getRegisterApiLoading(): Observable<boolean> {
    return this.registerLoading.asObservable();
  }

  getRegisterApiError(): Observable<string> {
    return this.registerError.asObservable();
  }

  // Generate Avatar
  getAvatar(name: string) {
    return 'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png';
    // return this.userApi.generateAvatarApi(name).pipe(take(1));
  }
}

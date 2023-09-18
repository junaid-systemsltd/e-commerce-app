import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  GENERATE_AVATAR_ENDPOINT,
  LOGIN_ENDPOINT,
  PROFILE_ENDPOINT,
  REGISTER_USER_ENDPOINT,
} from 'src/app/constants/api.constant';
import { RegisterUser } from 'src/types/api.types';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(LOGIN_ENDPOINT, body);
  }

  profile(headers?: any): Observable<any> {
    return this.http.get<any>(PROFILE_ENDPOINT, { headers });
  }

  registerUser(body: RegisterUser) {
    return this.http.post(REGISTER_USER_ENDPOINT, body);
  }

  generateAvatarApi(name: string) {
    return this.http.get(`${GENERATE_AVATAR_ENDPOINT}?u=${name}`);
  }
}

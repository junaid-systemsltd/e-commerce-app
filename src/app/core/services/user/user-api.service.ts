import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  LOGIN_ENDPOINT,
  PROFILE_ENDPOINT,
} from 'src/app/constants/api.constant';

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
}

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BASE_URL, LOGIN_ENDPOINT } from 'src/app/constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  loginUser(email: string, password: string): Observable<any> {
    const endpoint = BASE_URL + LOGIN_ENDPOINT;
    const body = { email, password };
    return this.http.post<any>(endpoint, body);
  }
}

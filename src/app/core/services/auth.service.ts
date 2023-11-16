import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user`, userDetails);
  }

  // getUserByEmail(email: string): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}/user/${email}`);
  // }

  //json-server
  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user?email=${email}`);
  }
}

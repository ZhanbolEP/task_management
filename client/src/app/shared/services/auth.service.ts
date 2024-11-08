import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../interfaces';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null;

  constructor(private http: HttpClient) {
    // Retrieve the token from localStorage on service initialization
    this.token = localStorage.getItem('auth-token');
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user).pipe(
      catchError(err => {
        console.error('Registration failed', err);
        return throwError(() => err);  // Wrap error for RxJS compatibility
      })
    );
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user).pipe(
      tap(({ token }) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      }),
      catchError(err => {
        console.error('Login failed', err);
        return throwError(() => err);  // Wrap error for RxJS compatibility
      })
    );
  }

  setToken(token: string | null): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.setToken(null);
    localStorage.clear();//removeItem('auth-token');
  }
}

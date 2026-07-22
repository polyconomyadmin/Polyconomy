import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:8000/api';
  private TOKEN_KEY = 'token';
  private USER_KEY = 'user';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * 🔐 Auth endpoints
   */
  signup(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/users/signup/`, data);
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/users/login/`, data);
  }

  /**
   * 🔑 Session management
   */
  setSession(response: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  /**
   * 🔁 Password reset
   */
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.API}/users/forgot-password/`, { email });
  }

  resetPassword(uid: string, token: string, password: string): Observable<any> {
    return this.http.post(`${this.API}/users/reset-password/`, {
      uid,
      token,
      password,
    });
  }

}

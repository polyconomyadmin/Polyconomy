import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'https://polyconomy-74386831d29f.herokuapp.com/api';
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
    // localStorage doesn't exist during server-side prerendering.
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(this.TOKEN_KEY);
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

  /**
   * 👤 Profile (these endpoints check the login token)
   */
  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem(this.TOKEN_KEY) || ''}` });
  }

  /** Replaces the stored user so the rest of the app sees the change. */
  setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /** Send only the fields to change: a new name, and/or avatar (a data: URL, or null to remove). */
  updateProfile(changes: { name?: string; avatar?: string | null }): Observable<{ user: any }> {
    return this.http
      .post<{ user: any }>(`${this.API}/users/profile/`, changes, { headers: this.authHeaders() })
      .pipe(tap(res => this.setUser({ ...this.getUser(), ...res.user })));
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.API}/users/change-password/`,
      { current_password: currentPassword, new_password: newPassword },
      { headers: this.authHeaders() }
    );
  }

  /**
   * ✉️ Contact form
   */
  sendContactMessage(data: { name: string; email: string; subject: string; message: string }): Observable<any> {
    return this.http.post(`${this.API}/users/contact/`, data);
  }
}

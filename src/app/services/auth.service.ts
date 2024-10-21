import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://event-app-backend-1.onrender.com/api/auth'; // Update the API base URL if needed
  private loggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());

  constructor(private http: HttpClient) { }

  /**
   * Register a new user
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  /**
   * Login user and store token on success
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          this.storeToken(response.token); // Store the token correctly
          this.loggedIn.next(true); // Update logged-in status
        }
        return response;
      })
    );
  }

  /**
   * Store JWT token in local storage
   */
  private storeToken(token: string): void {
    localStorage.setItem('token', token); // Store with key 'token'
  }

  /**
   * Get JWT token from local storage
   */
  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve with key 'token'
  }

  /**
   * Check if token exists in local storage
   */
  isTokenAvailable(): boolean {
    return !!this.getToken(); // Ensure token exists
  }

  /**
   * Logout user by clearing the token and updating status
   */
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    this.loggedIn.next(false); // Update login status
  }

  /**
   * Observable to track login state
   */
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getCurrentUser(): { userId: number; username: string } | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return { userId: payload.userId, username: payload.sub };
  }
}

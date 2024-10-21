import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from '../models/event.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'https://event-app-backend-1.onrender.com/api/events'; // Adjust the URL if necessary

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Helper method to get the HTTP headers with Authorization token
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Get all Events
  getAllEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get Events by creator ID
  getEventsByCreator(creatorId: number): Observable<Events[]> {
    return this.http.get<Events[]>(`${this.baseUrl}/creator/${creatorId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Create a new Event
  createEvent(event: Events): Observable<Events> {
    return this.http.post<Events>(this.baseUrl, event, {
      headers: this.getAuthHeaders(),
    });
  }

  // Update an existing Event
  updateEvent(eventId: number, event: Events): Observable<Events> {
    return this.http.put<Events>(`${this.baseUrl}/${eventId}`, event, {
      headers: this.getAuthHeaders(),
    });
  }

  // Delete an Event (admin only)
  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${eventId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Get registered Events for the logged-in user
  getMyRegisteredEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`${this.baseUrl}/my-registered`, {
      headers: this.getAuthHeaders(),
    });
  }
}

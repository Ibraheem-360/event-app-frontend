// attendee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../models/attendee.model';

@Injectable({
  providedIn: 'root',
})
export class AttendeeService {
  private baseUrl = 'https://event-app-backend-1.onrender.com/api/attendees'; // Adjust if needed

  constructor(private http: HttpClient) { }

  // Register the logged-in user for an event
  registerForEvent(eventId: number): Observable<Attendee> {
    const headers = this.getAuthHeaders();
    return this.http.post<Attendee>(`${this.baseUrl}/register/${eventId}`, {}, { headers });
  }

  // Cancel registration for an event
  cancelRegistration(attendeeId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/cancel/${attendeeId}`, { headers });
  }

  // Get all attendees for a specific event
  getAttendeesByEvent(eventId: number): Observable<Attendee[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Attendee[]>(`${this.baseUrl}/event/${eventId}`, { headers });
  }

  // Helper method to set authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}

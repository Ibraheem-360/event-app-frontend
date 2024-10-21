import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AttendeeService } from 'src/app/services/attendee.service';
import { Events } from 'src/app/models/event.model';
import { Attendee } from 'src/app/models/attendee.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Events[] = [];
  attendees: { [eventId: number]: Attendee[] } = {}; // Store attendees per event
  showAttendees: { [eventId: number]: boolean } = {}; // Control visibility of attendees

  constructor(
    private eventService: EventService,
    private attendeeService: AttendeeService
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  // Load all events
  loadEvents(): void {
    this.eventService.getAllEvents().subscribe((events) => {
      this.events = events;
    });
  }

  // Register for an event
  registerForEvent(eventId: number): void {
    this.attendeeService.registerForEvent(eventId).subscribe(
      (response) => {
        console.log('Registered successfully:', response);
        alert('Registered successfully!');
        this.loadAttendees(eventId); // Reload attendees after registration
      },
      (error) => {
        console.error('Error registering:', error);
        alert('Registration failed!');
      }
    );
  }

  // Toggle visibility of attendees for an event
  toggleAttendees(eventId: number): void {
    if (this.showAttendees[eventId]) {
      // Hide attendees
      this.showAttendees[eventId] = false;
    } else {
      // Show attendees and load them if not already loaded
      this.showAttendees[eventId] = true;
      this.loadAttendees(eventId);
    }
  }

  // Load attendees for a specific event
  loadAttendees(eventId: number): void {
    this.attendeeService.getAttendeesByEvent(eventId).subscribe(
      (attendees) => {
        this.attendees[eventId] = attendees;
      },
      (error) => {
        console.error('Error loading attendees:', error);
      }
    );
  }
}

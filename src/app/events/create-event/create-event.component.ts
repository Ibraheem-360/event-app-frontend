// create-event.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router
import { EventService } from 'src/app/services/event.service';
import { Events } from 'src/app/models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  event: Events = {
    title: '',
    description: '',
    location: '',
    eventDate: '',
    capacity: 0,
  };

  constructor(
    private eventService: EventService,
    private router: Router  // Inject Router
  ) { }

  createEvent(): void {
    this.eventService.createEvent(this.event).subscribe({
      next: (response) => {
        console.log('Event created:', response);
        this.router.navigate(['/events']);  // Redirect to events page
      },
      error: (err) => {
        console.error('Error creating event:', err);
      }
    });
  }
}

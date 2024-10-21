import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Events } from 'src/app/models/event.model';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events: Events[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadMyRegisteredEvents();
  }

  // Load the events the user has registered for
  loadMyRegisteredEvents(): void {
    this.eventService.getMyRegisteredEvents().subscribe((events) => {
      this.events = events;
    });
  }
}

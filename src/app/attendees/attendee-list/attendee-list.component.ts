// attendee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AttendeeService } from 'src/app/services/attendee.service';
import { ActivatedRoute } from '@angular/router';
import { Attendee } from 'src/app/models/attendee.model';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.css']
})
export class AttendeeListComponent implements OnInit {
  attendees: Attendee[] = [];
  eventId: number | null = null;

  constructor(
    private attendeeService: AttendeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    if (this.eventId) {
      this.loadAttendees();
    }
  }

  loadAttendees(): void {
    this.attendeeService.getAttendeesByEvent(this.eventId!).subscribe(
      (attendees) => (this.attendees = attendees),
      (error) => console.error('Error loading attendees:', error)
    );
  }
}

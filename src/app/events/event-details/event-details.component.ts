// // event-details.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { EventService } from 'src/app/services/event.service'; 
// import { Events } from 'src/app/models/event.model'; 

// @Component({
//   selector: 'app-event-details',
//   templateUrl: './event-details.component.html',
//   styleUrls: ['./event-details.component.css']
// })
// export class EventDetailsComponent implements OnInit {
//   event: Event | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private eventService: EventService
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.eventService.getEventById(+id).subscribe((event) => {
//         this.event = event;
//       });
//     }
//   }
// }

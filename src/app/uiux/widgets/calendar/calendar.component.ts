import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() content: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };
  constructor() {}

  ngOnInit(): void {}
}

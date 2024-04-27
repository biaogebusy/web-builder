import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import type { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() content: any;
  @Input() options: CalendarOptions;
  @Input() loading: boolean;
  eventGuid = 0;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() content: any;
  @Input() options: CalendarOptions;
  @Input() loading: boolean;
  isBrowser = false;
  eventGuid = 0;

  constructor(private screenSerivce: ScreenService) {
    if (this.screenSerivce.isPlatformBrowser()) {
      this.isBrowser = true;
    }
  }

  ngOnInit(): void {}
}

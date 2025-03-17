import { Component, Input, OnInit, inject } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { CalendarOptions } from '@fullcalendar/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    standalone: false
})
export class CalendarComponent implements OnInit {
  @Input() content: any;
  @Input() options: CalendarOptions;
  @Input() loading: boolean;
  isBrowser = false;
  eventGuid = 0;
  screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isBrowser = true;
    }
  }
}

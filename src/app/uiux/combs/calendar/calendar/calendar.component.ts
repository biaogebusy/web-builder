import { Component, OnInit, inject, ChangeDetectionStrategy, input } from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import type { CalendarOptions } from '@fullcalendar/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [FullCalendarModule, LoadingComponent],
})
export class CalendarComponent implements OnInit {
  readonly content = input<any>();
  readonly options = input<CalendarOptions>();
  readonly loading = input<boolean>();
  isBrowser = false;
  eventGuid = 0;
  screenService = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.isBrowser = true;
    }
  }
}

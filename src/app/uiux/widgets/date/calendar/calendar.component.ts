import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { ScreenService } from '@core/service/screen.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() events: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  calendarOptions: CalendarOptions;
  default: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: 'zh-cn',
    handleWindowResize: true,
    eventClick: (data) => {
      this.handleDateClick(data);
    },
    headerToolbar: {
      start: 'prev today next',
      center: 'title',
      end: 'dayGridMonth timeGridWeek listWeek',
    },
  };
  constructor(
    public appState: AppState,
    private cd: ChangeDetectorRef,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.appState.calendarChange$
        .pipe(takeUntil(this.destroy$))
        .subscribe((events) => {
          this.calendarOptions = Object.assign(this.default, this.content, {
            events,
          });
          this.cd.markForCheck();
          console.log(events);
        });
    }
  }

  handleDateClick(arg: any): void {
    console.log(arg.view.getCurrentData());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

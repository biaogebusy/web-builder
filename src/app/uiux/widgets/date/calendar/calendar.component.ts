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
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/angular';
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
  calendarVisible: boolean;
  events: EventInput[];
  currentEvents: EventApi[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  calendarOptions: CalendarOptions;
  eventGuid = 0;
  default: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: 'zh-hans',
    handleWindowResize: true,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    headerToolbar: {
      start: 'prev today next',
      center: 'title',
      end: 'dayGridMonth timeGridWeek timeGridDay listWeek',
    },
  };
  constructor(
    public appState: AppState,
    private cd: ChangeDetectorRef,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.appState.calendarChange$.subscribe((events) => {
        this.calendarOptions = Object.assign(this.default, this.content, {
          events,
        });
        this.calendarVisible = true;
        this.cd.markForCheck();
        console.log(events);
      });
    }
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    // const title = prompt('Please enter a new title for your event');
    // const calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: this.createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg): void {
    // clickInfo.event 当前event相关的信息
    console.log(clickInfo);
  }

  handleEvents(events: EventApi[]): void {
    console.log(events);
    this.currentEvents = events;
  }

  createEventId(): string {
    return String(this.eventGuid++);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

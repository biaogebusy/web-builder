import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import { CalendarOptions, DatesSetArg } from '@fullcalendar/core';
import { CalendarState } from '@core/state/CalendarState';
import { formatDate } from '@angular/common';
import { RouteService } from '@core/service/route.service';
import type { IFullCalendar } from '@core/interface/combs/ICalendar';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import type { IPage } from '@core/interface/IAppConfig';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FullCalendarComponent extends BaseComponent implements OnInit {
  @Input() readonly content: IFullCalendar;
  public options: CalendarOptions;
  private theme: any;
  public form = new UntypedFormGroup({});
  public model: any = {};
  public loading: boolean;
  public visiable = false;

  private cd = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private nodeService = inject(NodeService);
  private routeService = inject(RouteService);
  private contentState = inject(ContentState);
  private screenService = inject(ScreenService);
  private calendarState = inject(CalendarState);
  private contentService = inject(ContentService);

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.getEvents();
    }
  }

  initCalendar(): void {
    this.options = Object.assign(this.calendarState.default, this.content.calendar.options, {
      datesSet: this.handleDates.bind(this),
    });
    this.theme = this.content?.calendar?.theme || {};
    this.cd.detectChanges();
  }

  onChange(value: any): void {
    this.getEvents(value);
  }

  getEvents(options?: any): void {
    if (options?.date) {
      options.date = formatDate(options.date, 'yyyy-MM-dd', 'en-US');
    }
    const state = this.getParamsState(this.form.value, options);
    const params = this.getApiParams(state);
    const api = this.content?.calendar?.api ?? '';
    this.initCalendar();
    if (this.content.calendar?.options?.events) {
      this.options.events = this.content.calendar.options.events;
      this.initEvents();
      this.cd.detectChanges();
      return;
    }
    if (api || params || this.options?.events) {
      this.nodeService
        .fetch(api, params)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(data => {
          if (this.options) {
            let events = [];
            if (data.rows && data.pager) {
              // view api
              events = data.rows;
            } else {
              // custom calendar api
              events = data;
            }
            this.options.events = events.map((item: any) => {
              // events attr see EventApi
              const type = item.type;
              const event = item.event;
              return {
                title: item.label || item.title,
                event,
                type,
                start: item.date || item.created,
                url: item.url,
                end: item.end || null,
                user: item.user,
                className: `${this.theme[type]} ${this.theme[event]} type-${type} event-${event}`,
                // custom event style bg, border
              };
            });
            this.initEvents();
            this.cd.detectChanges();
          }
        });
    }
  }

  initEvents(): void {
    this.options.eventClick = (info: any) => {
      if (this.content.calendar?.drawer) {
        this.contentState.drawerOpened$.next(true);
        this.contentState.drawerLoading$.next(true);
        this.cd.detectChanges();
        this.contentService
          .loadPageContent(info.event.url)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((content: IPage) => {
            this.contentState.drawerLoading$.next(false);
            this.contentState.drawerContent$.next(content);
            this.cd.detectChanges();
          });
        info.jsEvent.preventDefault();
        return;
      }
      this.routeService.eventLinkToNav(info.jsEvent);
      this.cd.detectChanges();
    };
    this.visiable = true;
    this.loading = false;
    this.cd.detectChanges();
  }

  handleDates(dates: DatesSetArg): void {
    switch (dates.view.type) {
      case 'dayGridMonth':
        this.form.patchValue({
          'date-type': 'month',
          'date': `${formatDate(dates.view.currentStart, 'y-MM-dd', 'en-US')}`,
        });
        break;

      case 'timeGridWeek':
        const endDate = this.calendarState.getPreviousDay(dates.end);
        console.log(endDate);
        this.form.patchValue({
          'date-type': 'week',
          'date': `${formatDate(dates.startStr, 'y-MM-dd', 'en-US')}`,
        });
        break;

      case 'timeGridDay':
        this.form.patchValue({
          'date-type': 'day',
          'date': formatDate(dates.startStr, 'y-MM-dd', 'en-US'),
        });
        break;

      case 'listWeek':
        this.form.patchValue({
          'date-type': 'week',
          'date': `${formatDate(dates.startStr, 'y-MM-dd', 'en-US')}`,
        });
        break;

      default:
        this.getEvents({ 'date-type': 'month' });
    }
  }
}

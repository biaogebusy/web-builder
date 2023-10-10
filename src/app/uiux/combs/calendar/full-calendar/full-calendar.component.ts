import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';
import { NodeService } from '@core/service/node.service';
import { BaseComponent } from '@uiux/base/base.widget';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { CalendarOptions, DatesSetArg, ViewApi } from '@fullcalendar/angular';
import { CalendarState } from '@core/state/CalendarState';
import { formatDate } from '@angular/common';
import { RouteService } from '@core/service/route.service';
import type { IFullCalendar } from '@core/interface/combs/ICalendar';
import { ContentService } from '@core/service/content.service';
import { ContentState } from '@core/state/ContentState';
import type { IPage } from '@core/interface/IAppConfig';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullCalendarComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @Input() content: IFullCalendar;
  selected: Date | null;
  options: CalendarOptions;
  theme: any;
  form: FormGroup;
  loading: boolean;
  visiable = false;
  viewApi: ViewApi;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private cd: ChangeDetectorRef,
    private formService: FormService,
    private screenService: ScreenService,
    private nodeService: NodeService,
    private calendarState: CalendarState,
    private routeService: RouteService,
    private contentService: ContentService,
    private contentState: ContentState
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.initForm();
      this.getEvents();
    }
  }

  initCalendar(): void {
    this.options = Object.assign(
      this.calendarState.default,
      this.content.calendar.options,
      {
        datesSet: this.handleDates.bind(this),
      }
    );
    this.theme = this.content?.calendar?.theme || {};
    this.cd.detectChanges();
  }

  initForm(): void {
    const calendarForm: any[] = [
      {
        key: 'date',
        value: '',
      },
      {
        key: 'date-type',
      },
    ];
    this.form = this.formService.toFormGroup(
      calendarForm.concat(this.content.sidebar || [])
    );
    this.form.valueChanges
      .pipe(
        map((data) => {
          if (Object.keys(data).includes('datepicker') && data.datepicker) {
            this.viewApi.calendar.changeView('timeGridDay', data.datepicker);
            this.form.controls.datepicker.setValue('');
            return EMPTY;
          }
          this.loading = true;
          this.cd.detectChanges();
          return data;
        }),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        if (value) {
          this.getEvents(value);
        }
      });
  }

  getEvents(options?: any): void {
    const state = this.getParamsState(this.form.value, options);
    const params = this.getApiParams(state);
    const api = this.content?.calendar?.api || '';
    this.initCalendar();
    if (this.content.calendar?.options?.events) {
      this.options.events = this.content.calendar.options.events;
      this.initEvents();
      this.cd.detectChanges();
      return;
    }
    if (api || params || this.options?.events) {
      this.nodeService.fetch(api, params).subscribe((data) => {
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
              title: item.label,
              event,
              type,
              start: item.date,
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
    this.options.eventClick = (info) => {
      if (this.content.calendar?.drawer) {
        this.contentState.drawerOpened$.next(true);
        this.contentState.drawerLoading$.next(true);
        this.cd.detectChanges();
        this.contentService
          .loadPageContent(info.event.url)
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
    this.viewApi = dates.view;
    switch (dates.view.type) {
      case 'dayGridMonth':
        this.form.patchValue({
          'date-type': 'month',
          date: `${formatDate(dates.view.currentStart, 'y-MM-dd', 'en-US')}`,
        });
        break;

      case 'timeGridWeek':
        const endDate = this.calendarState.getPreviousDay(dates.end);
        console.log(endDate);
        this.form.patchValue({
          'date-type': 'week',
          date: `${formatDate(dates.startStr, 'y-MM-dd', 'en-US')}`,
        });
        break;

      case 'timeGridDay':
        this.form.patchValue({
          'date-type': 'day',
          date: formatDate(dates.startStr, 'y-MM-dd', 'en-US'),
        });
        break;

      case 'listWeek':
        this.form.patchValue({
          'date-type': 'week',
          date: `${formatDate(dates.startStr, 'y-MM-dd', 'en-US')}`,
        });
        break;

      default:
        this.getEvents({ 'date-type': 'month' });
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$.next) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}

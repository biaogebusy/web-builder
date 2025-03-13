import { Injectable, inject } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Subject } from 'rxjs';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ScreenService } from '@core/service/screen.service';
@Injectable({
  providedIn: 'root',
})
export class CalendarState {
  private screenSerivce = inject(ScreenService);

  public calendarChange$ = new Subject();
  public default: CalendarOptions;

  constructor() {
    if (this.screenSerivce.isPlatformBrowser()) {
      this.default = {
        initialView: 'dayGridMonth',
        locale: 'zh-cn',
        handleWindowResize: true,
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        firstDay: 0,
        allDayText: '全天',
        headerToolbar: {
          start: 'prev today next',
          center: 'title',
          end: 'dayGridMonth timeGridWeek timeGridDay listWeek',
        },
        buttonText: {
          today: '今天',
          month: '月份',
          week: '星期',
          day: '日',
          list: '列表',
        },
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      };
    }
  }

  getPreviousDay(date = new Date()): Date {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);
    return previous;
  }
}

import { CalendarOptions } from '@fullcalendar/angular';

export interface IFullCalendar {
  sidebar: any[];
  calendar: {
    options: CalendarOptions;
    theme: object;
    api?: string;
  };
}

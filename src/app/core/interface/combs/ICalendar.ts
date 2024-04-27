import { CalendarOptions } from '@fullcalendar/angular';
import { ICombsBase } from './ICombsBase';

export interface IFullCalendar extends ICombsBase {
  sidebar: any[];
  calendar: {
    options: CalendarOptions;
    theme: object;
    api?: string;
    drawer?: boolean;
  };
}

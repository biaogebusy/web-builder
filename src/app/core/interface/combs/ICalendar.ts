import { CalendarOptions } from '@fullcalendar/core';
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

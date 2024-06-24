import { CalendarOptions } from '@fullcalendar/core';
import { ICombsBase } from './ICombsBase';
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface IFullCalendar extends ICombsBase {
  form: FormlyFieldConfig[];
  calendar: {
    options: CalendarOptions;
    theme: object;
    api?: string;
    drawer?: boolean;
  };
}

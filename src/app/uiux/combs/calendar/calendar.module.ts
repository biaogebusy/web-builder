import { NgModule } from '@angular/core';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { ShareModule } from '@share/share.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';

const components = [FullCalendarComponent, CalendarComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FullCalendarModule],
  exports: [...components],
  providers: [],
})
export class CalendarModule extends BaseModule {
  dynamicComponents = [FullCalendarComponent];

  static forStorybook(): any {
    return [...components];
  }
}

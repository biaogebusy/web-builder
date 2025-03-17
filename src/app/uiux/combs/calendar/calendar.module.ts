import { NgModule } from '@angular/core';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { ShareModule } from '@share/share.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { FormModule } from '@uiux/combs/form/form.module';

const components = [FullCalendarComponent, CalendarComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, FullCalendarModule, FormModule],
  exports: [...components],
  providers: [],
})
export class CalendarModule extends BaseModule {
  dynamicComponents = [FullCalendarComponent];
}

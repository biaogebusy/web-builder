import { NgModule } from '@angular/core';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

const components = [FullCalendarComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
  providers: [],
})
export class CalendarModule {}

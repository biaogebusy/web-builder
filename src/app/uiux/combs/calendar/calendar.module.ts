import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DynamicCombsModule } from '../dynamic-combs/dynamic-combs.module';

const components = [FullCalendarComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, MatSidenavModule, DynamicCombsModule],
  exports: [...components],
  providers: [],
})
export class CalendarModule {}

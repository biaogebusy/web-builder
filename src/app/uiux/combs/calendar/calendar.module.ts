import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BaseModule } from '@uiux/base/base.module';
import { CommonModule } from '@angular/common';

const components = [FullCalendarComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule],
  exports: [...components],
  providers: [],
})
export class CalendarModule extends BaseModule {
  dynamicComponents = [FullCalendarComponent];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}

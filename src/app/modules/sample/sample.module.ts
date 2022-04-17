import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import { SampleWidgetsComponent } from './sample-widgets/sample-widgets.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

@NgModule({
  declarations: [SampleWidgetsComponent],
  imports: [CommonModule, WidgetsModule, SampleRoutingModule],
})
export class SampleModule {}

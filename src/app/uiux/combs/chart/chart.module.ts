import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { ChartBoxComponent } from './chart-box/chart-box.component';
import { BaseModule } from '@uiux/base/base.module';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';

const components = [ChartComponent, ChartBoxComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class ChartModule extends BaseModule {
  dynamicComponents = [...components];
}

import { NgModule } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { ChartBoxComponent } from './chart-box/chart-box.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [ChartComponent, ChartBoxComponent];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class ChartModule extends BaseModule {
  dynamicComponents = [...components];
}

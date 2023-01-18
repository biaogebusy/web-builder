import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { LotteryComponent } from './lottery/lottery.component';

const components = [LotteryComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule],
  exports: [...components],
})
export class CalculatorModule extends BaseModule {
  dynamicComponents = [LotteryComponent];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}

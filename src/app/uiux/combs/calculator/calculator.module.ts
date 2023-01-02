import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { BaseModule } from '@uiux/base/base.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { LotteryComponent } from './lottery/lottery.component';

const components = [LotteryComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
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

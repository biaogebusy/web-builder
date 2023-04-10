import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { ShareModule } from '@share/share.module';
import { BaseModule } from '@uiux/base/base.module';
import { DashboardBoxComponent } from './dashboard-box/dashboard-box.component';

const components = [DashboardComponent, DashboardBoxComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule],
  exports: [...components],
})
export class DashboardModule extends BaseModule {
  dynamicComponents = [...components];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  static forStorybook(): any {
    return [...components];
  }
}

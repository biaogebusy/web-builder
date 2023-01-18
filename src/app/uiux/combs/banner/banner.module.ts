import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BannerSimpleComponent } from './banner-simple/banner-simple.component';

const components = [BannerSimpleComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule],
  exports: [...components],
})
export class BannerModule extends BaseModule {
  dynamicComponents = [BannerSimpleComponent];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}

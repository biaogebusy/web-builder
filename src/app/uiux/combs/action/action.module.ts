import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Action1v1Component } from './action1v1/action1v1.component';

const components = [Action1v1Component];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, WidgetsModule],
  exports: [...components],
})
export class ActionModule extends BaseModule {
  dynamicComponents = [Action1v1Component];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}

import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { NgxPackeryModule } from 'ngx-packery';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { PackeryComponent } from './packery/packery.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [ShuffleComponent, PackeryComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule, NgxPackeryModule],

  exports: [...components],
})
export class MasonryModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}

import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [ShuffleComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],

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

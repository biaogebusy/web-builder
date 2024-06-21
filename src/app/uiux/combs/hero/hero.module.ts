import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Hero2v1Component } from './hero2v1/hero2v1.component';
import { Hero1v1Component } from './hero1v1/hero1v1.component';
import { Hero2v2Component } from './hero2v2/hero2v2.component';
import { Hero2v3Component } from './hero2v3/hero2v3.component';
import { Hero1v2Component } from './hero1v2/hero1v2.component';
import { BaseModule } from '@uiux/base/base.module';
import { Hero1v4Component } from './hero1v4/hero1v4.component';

const components = [
  Hero1v1Component,
  Hero1v2Component,
  Hero1v4Component,
  Hero2v1Component,
  Hero2v2Component,
  Hero2v3Component,
];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class HeroModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}

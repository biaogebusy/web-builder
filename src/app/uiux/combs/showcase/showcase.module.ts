import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { ShareModule } from '@share/share.module';
import { Showcase1v1Component } from './showcase1v1/showcase1v1.component';
import { Showcase1v3Component } from './showcase1v3/showcase1v3.component';
import { Showcase2v1Component } from './showcase2v1/showcase2v1.component';
import { Showcase2v2Component } from './showcase2v2/showcase2v2.component';
import { Showcase2v3Component } from './showcase2v3/showcase2v3.component';
import { Showcase2v4Component } from './showcase2v4/showcase2v4.component';
import { Showcase3v1Component } from './showcase3v1/showcase3v1.component';
import { Showcase3v2Component } from './showcase3v2/showcase3v2.component';
import { Showcase3v3Component } from './showcase3v3/showcase3v3.component';
import { Showcase3v4Component } from './showcase3v4/showcase3v4.component';
import { Showcase3v5Component } from './showcase3v5/showcase3v5.component';
import { Showcase3v6Component } from './showcase3v6/showcase3v6.component';
import { Showcase3v7Component } from './showcase3v7/showcase3v7.component';
import { Showcase3v8Component } from './showcase3v8/showcase3v8.component';
import { Showcase4v1Component } from './showcase4v1/showcase4v1.component';
import { Showcase2v5Component } from './showcase2v5/showcase2v5.component';
import { Showcase2v6Component } from './showcase2v6/showcase2v6.component';
import { Showcase3v9Component } from './showcase3v9/showcase3v9.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  Showcase1v1Component,
  Showcase1v3Component,
  Showcase2v1Component,
  Showcase2v2Component,
  Showcase2v3Component,
  Showcase2v4Component,
  Showcase2v5Component,
  Showcase2v6Component,
  Showcase3v1Component,
  Showcase3v2Component,
  Showcase3v3Component,
  Showcase3v4Component,
  Showcase3v5Component,
  Showcase3v6Component,
  Showcase3v7Component,
  Showcase3v8Component,
  Showcase3v9Component,
  Showcase4v1Component,
];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule],
  exports: [...components],
})
export class ShowcaseModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}

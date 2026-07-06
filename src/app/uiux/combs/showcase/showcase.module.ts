import { NgModule } from '@angular/core';
import { Showcase1v1Component } from './showcase1v1/showcase1v1.component';
import { Showcase3v3Component } from './showcase3v3/showcase3v3.component';
import { Showcase3v9Component } from './showcase3v9/showcase3v9.component';
import { Showcase4v1Component } from './showcase4v1/showcase4v1.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  Showcase1v1Component,
  Showcase3v3Component,
  Showcase3v9Component,
  Showcase4v1Component,
];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class ShowcaseModule extends BaseModule {
  dynamicComponents = [...components];
}

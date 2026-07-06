import { NgModule } from '@angular/core';
import { Hero1v1Component } from './hero1v1/hero1v1.component';
import { Hero2v3Component } from './hero2v3/hero2v3.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [
  Hero1v1Component,
  Hero2v3Component,
];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class HeroModule extends BaseModule {
  dynamicComponents = [...components];
}

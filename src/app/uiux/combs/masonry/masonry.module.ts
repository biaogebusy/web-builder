import { NgModule } from '@angular/core';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [ShuffleComponent];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class MasonryModule extends BaseModule {
  dynamicComponents = [...components];
}

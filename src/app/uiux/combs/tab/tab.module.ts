import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Tab1v1Component } from './tab1v1/tab1v1.component';
import { BaseModule } from '@uiux/base/base.module';

const components = [Tab1v1Component];

@NgModule({
  declarations: [...components, Tab1v1Component],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class TabModule extends BaseModule {
  dynamicComponents = [...components];
}

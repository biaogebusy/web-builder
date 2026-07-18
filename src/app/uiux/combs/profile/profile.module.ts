import { NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { WidgetsModule } from '../../widgets/widgets.module';
import { Profile1v1Component } from './profile1v1/profile1v1.component';
import { ListModule } from '../list/list.module';
import { BaseModule } from '@uiux/base/base.module';
import { NodeModule } from '@uiux/combs/node/node.module';

const components = [Profile1v1Component];

@NgModule({
  declarations: [],
  imports: [
    ShareModule,
    WidgetsModule,
    ListModule,
    NodeModule,
    ...components,
  ],
  exports: [...components],
})
export class ProfileModule extends BaseModule {
  dynamicComponents = [...components];
}

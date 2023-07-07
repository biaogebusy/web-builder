import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ManageBlockComponent } from './manage-block/manage-block.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';

import { BaseModule } from '@uiux/base/base.module';
const components = [ManageMediaComponent, ManageBlockComponent];

@NgModule({
  declarations: [...components],
  imports: [
    MatSidenavModule,
    MatSliderModule,
    ShareModule,
    WidgetsModule,
    ManageRoutingModule,
  ],
})
export class ManageModule extends BaseModule {
  dynamicComponents = [...components];
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
  static forStorybook(): any {
    return [...components];
  }
}

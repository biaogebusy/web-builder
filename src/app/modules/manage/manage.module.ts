import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { ShareModule } from '@share/share.module';
import { ManageRoutingModule } from './manage-routing.module';
import { ManageMediaComponent } from './manage-media/manage-media.component';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { ManageBlockComponent } from './manage-block/manage-block.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';

import { BaseModule } from '@uiux/base/base.module';
import { MEDIA_ASSETS } from '@core/token/token-providers';
import { mediaAssetsFactory } from '@core/factory/factory';
import { NodeService } from '@core/service/node.service';
import { ManageService } from '@core/service/manage.service';
import { ContentState } from '@core/state/ContentState';
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
  providers: [
    {
      provide: MEDIA_ASSETS,
      useFactory: mediaAssetsFactory,
      deps: [NodeService, ManageService, ContentState],
    },
  ],
  exports: [...components],
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

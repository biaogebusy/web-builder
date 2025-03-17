import { NgModule } from '@angular/core';
import { BaseModule } from '@uiux/base/base.module';
import { WidgetsModule } from '@uiux/widgets/widgets.module';
import { BannerSimpleComponent } from './banner-simple/banner-simple.component';
import { ShareModule } from '@share/share.module';

const components = [BannerSimpleComponent];

@NgModule({
  declarations: [...components],
  imports: [ShareModule, WidgetsModule],
  exports: [...components],
})
export class BannerModule extends BaseModule {
  dynamicComponents = [BannerSimpleComponent];
}

import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { VideoBgComponent } from './video-bg/video-bg.component';
import { ShareModule } from '@share/share.module';
import { BaseModule } from '@uiux/base/base.module';

const components = [VideoBgComponent];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule],
  exports: [...components],
})
export class VideoModule extends BaseModule {
  dynamicComponents = [...components];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}

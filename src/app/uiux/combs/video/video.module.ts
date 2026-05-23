import { NgModule } from '@angular/core';
import { VideoBgComponent } from './video-bg/video-bg.component';
import { BaseModule } from '@uiux/base/base.module';
import { VideoComponent } from './video/video.component';

const components = [VideoBgComponent, VideoComponent];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class VideoModule extends BaseModule {
  dynamicComponents = [...components];
}

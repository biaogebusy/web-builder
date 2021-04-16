import { NgModule } from '@angular/core';
import { WidgetsModule } from '../../widgets/widgets.module';
import { VideoBgComponent } from './video-bg/video-bg.component';
import { ShareModule } from 'src/app/share/share.module';
import { DynamicCombsModule } from '../dynamic-combs/dynamic-combs.module';

const components = [VideoBgComponent];

@NgModule({
  declarations: [...components],
  imports: [WidgetsModule, ShareModule, DynamicCombsModule],
  exports: [...components],
})
export class VideoModule {}

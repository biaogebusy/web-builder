import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsModule } from '../../widgets/widgets.module';
import { VideoBgComponent } from './video-bg/video-bg.component';
import { ShareModule } from 'src/app/share/share.module';

const components = [VideoBgComponent]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    WidgetsModule,
    ShareModule
  ],
  exports: [...components]
})
export class VideoModule { }

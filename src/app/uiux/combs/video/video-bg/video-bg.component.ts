import { Component, Input, AfterViewInit, ChangeDetectorRef, inject, ChangeDetectionStrategy } from '@angular/core';
import type { IVideoBg } from '@core/interface/combs/IVideoBg';
import type { IVideo } from '@core/interface/widgets/IVideo';
import { ScreenService } from '@core/service/screen.service';
import { BgComponent } from '@uiux/widgets/bg/bg.component';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { VideoComponent } from '../video/video.component';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-video-bg',
  templateUrl: './video-bg.component.html',
  styleUrls: ['./video-bg.component.scss'],
  imports: [BgComponent, VideoComponent, DynamicComponentComponent],
})
export class VideoBgComponent implements AfterViewInit {
  @Input() content: IVideoBg;
  @Input() options: any;
  video: IVideo;
  private screenService = inject(ScreenService);
  private cd = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.video = {
        type: 'video',
        options: {
          autoplay: true,
          controls: false,
          muted: true,
          loop: true,
          aspectRatio: '16:9',
          fluid: true,
          fill: true,
          sources: [
            {
              ...this.content.source,
            },
          ],
        },
      };
      this.cd.detectChanges();
    }
  }
}

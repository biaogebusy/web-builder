import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  OnDestroy,
  inject,
} from '@angular/core';
import { ICoreConfig } from '@core/interface/IAppConfig';
import type { IVideo } from '@core/interface/widgets/IVideo';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
declare let window: any;
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  // See options: https://videojs.com/guides/options
  // https://videojs.com/guides/angular/
  @Input() content: IVideo;

  private player: any;

  private util = inject(UtilitiesService);
  private screenSerivce = inject(ScreenService);

  async ngOnInit(): Promise<void> {
    if (this.screenSerivce.isPlatformBrowser()) {
      if (this.coreConfig.librariesUseLocal) {
        await this.util.loadStyle('/assets/injects/video-js/video-js.min.css');
        await this.util.loadScript('/assets/injects/video-js/video-js.min.js');
      } else {
        const videoStyle = this.util.getLibraries('video', 'cdn', 'style');
        const videoScript = this.util.getLibraries('video', 'cdn', 'script');
        await this.util.loadStyle(videoStyle);
        await this.util.loadScript(videoScript);
      }
      this.player = window.videojs(this.target.nativeElement, this.content.options);
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}

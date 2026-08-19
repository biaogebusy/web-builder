import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
  OnDestroy,
  inject,
  ChangeDetectionStrategy,
  input,
  viewChild
} from '@angular/core';
import { getLibraryAsset } from '@core/config/library-assets';
import { ICoreConfig } from '@core/interface/IAppConfig';
import type { IVideo } from '@core/interface/widgets/IVideo';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { VIDEO_ASSETS } from './video.assets';
declare let window: any;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit, OnDestroy {
  readonly target = viewChild<ElementRef>('target');
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  // See options: https://videojs.com/guides/options
  // https://videojs.com/guides/angular/
  readonly content = input.required<IVideo>();

  private player: any;

  private util = inject(UtilitiesService);
  private screenSerivce = inject(ScreenService);

  async ngOnInit(): Promise<void> {
    if (this.screenSerivce.isPlatformBrowser()) {
      const source = this.coreConfig.librariesUseLocal ? 'local' : 'cdn';
      await this.util.loadStyle(getLibraryAsset(VIDEO_ASSETS, source, 'style'));
      await this.util.loadScript(getLibraryAsset(VIDEO_ASSETS, source, 'script'));
      this.player = window.videojs(this.target()!.nativeElement, this.content().options);
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}

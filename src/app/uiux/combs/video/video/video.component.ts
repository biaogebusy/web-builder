import {
  ChangeDetectionStrategy, Component, DOCUMENT, ElementRef, ViewEncapsulation,
  afterRenderEffect, inject, input, signal, viewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import type videojs from 'video.js';
import { getLibraryAsset } from '@core/config/library-assets';
import type { IVideo } from '@core/interface/widgets/IVideo';
import { UtilitiesService } from '@core/service/utilities.service';
import { CORE_CONFIG } from '@core/token/token-providers';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';
import { VIDEO_ASSETS } from './video.assets';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [TranslateModule, BtnComponent],
})
export class VideoComponent {
  /** Video.js options supplied by the owning view. */
  readonly content = input.required<IVideo>();
  /** Accessible name for this player. */
  readonly label = input<string>();
  readonly failed = signal(false);
  private readonly target = viewChild.required<ElementRef<HTMLElement>>('target');
  private readonly coreConfig = inject(CORE_CONFIG);
  private readonly util = inject(UtilitiesService);
  private readonly document = inject(DOCUMENT);
  private readonly attempt = signal(0);

  constructor() {
    afterRenderEffect(onCleanup => {
      const content = this.content();
      const label = this.label();
      const container = this.target().nativeElement;
      this.attempt();
      this.failed.set(false);
      let active = true;
      let player: ReturnType<typeof videojs> | undefined;
      onCleanup(() => {
        active = false;
        player?.dispose();
        container.replaceChildren();
      });
      const source = this.coreConfig.librariesUseLocal ? 'local' : 'cdn';
      void (async () => {
        await this.util.loadStyle(getLibraryAsset(VIDEO_ASSETS, source, 'style'));
        if (!active) return;
        await this.util.loadScript(getLibraryAsset(VIDEO_ASSETS, source, 'script'));
        if (!active) return;
        const createPlayer = (window as Window & { videojs?: typeof videojs }).videojs;
        if (!createPlayer) throw new Error('Video.js did not initialize');
        // Video.js owns and removes its media element, so each update gets a fresh element.
        const video = this.document.createElement('video');
        video.className = 'video-js vjs-big-play-centered';
        video.controls = true;
        video.playsInline = true;
        video.preload = 'none';
        if (label) video.setAttribute('aria-label', label);
        container.append(video);
        player = createPlayer(video, content.options);
        if (label) player.el().setAttribute('aria-label', label);
        player.on('error', () => { if (active) this.failed.set(true); });
      })().catch(() => { if (active) this.failed.set(true); });
    });
  }

  /** Recreate a failed player using the current content. */
  retry(): void {
    this.attempt.update(value => value + 1);
  }
}

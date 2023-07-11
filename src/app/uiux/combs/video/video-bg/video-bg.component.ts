import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import type { IVideoBg } from '@core/interface/combs/IVideoBg';
import type { IPlayer } from '@core/interface/widgets/IPlayer';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-video-bg',
  templateUrl: './video-bg.component.html',
  styleUrls: ['./video-bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoBgComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: IVideoBg;
  @Input() options: any;
  video: IPlayer;
  constructor(
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.video = {
        type: 'player',
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

  ngOnDestroy(): void {}
}

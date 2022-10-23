import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IPlayer } from '@core/interface/widgets/IPlayer';
import { ScreenService } from '@core/service/screen.service';
@Component({
  selector: 'app-video-bg',
  templateUrl: './video-bg.component.html',
  styleUrls: ['./video-bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoBgComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  video: IPlayer;
  constructor(private screenService: ScreenService) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.video = {
        source: {
          type: 'video',
          sources: [
            {
              ...this.content.source,
            },
          ],
        },
      };
    }
  }

  ngOnDestroy(): void {}
}

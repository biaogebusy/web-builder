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
import type { IVideo } from '@core/interface/widgets/IVideo';
import { ScreenService } from '@core/service/screen.service';
import { UtilitiesService } from '@core/service/utilities.service';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  // See options: https://videojs.com/guides/options
  // https://videojs.com/guides/angular/
  @Input() content: IVideo;

  private player: any;

  private util = inject(UtilitiesService);
  private screenSerivce = inject(ScreenService);

  async ngOnInit(): Promise<void> {
    if (this.screenSerivce.isPlatformBrowser()) {
      await this.util.loadStyle('/assets/styles/video/video-js.min.css');
      this.player = videojs(this.target.nativeElement, this.content.options);
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}

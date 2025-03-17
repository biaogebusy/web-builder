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
import videojs from 'video.js';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class VideoComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  // See options: https://videojs.com/guides/options
  // https://videojs.com/guides/angular/
  @Input() content: IVideo;

  player: any;

  private screenSerivce = inject(ScreenService);

  ngOnInit(): void {
    if (this.screenSerivce.isPlatformBrowser()) {
      this.player = videojs(this.target.nativeElement, this.content.options);
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}

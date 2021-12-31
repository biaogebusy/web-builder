import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ScreenService } from '@core/service/screen.service';
import videojs from 'video.js';
@Component({
  selector: 'app-video-bg',
  templateUrl: './video-bg.component.html',
  styleUrls: ['./video-bg.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoBgComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() content: any;
  @ViewChild('target', { static: true }) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/maintutorial-options.html
  // https://docs.videojs.com/tutorial-angular.html
  options: {
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };
  player: videojs.Player;
  constructor(
    private elementRef: ElementRef,
    private screenService: ScreenService
  ) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.options = this.content.params;
      // instantiate Video.js
      const video = this.elementRef.nativeElement.querySelectorAll('video')[0];
      this.player = videojs(video, this.options, () => {});
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}

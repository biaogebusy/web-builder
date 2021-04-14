import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import videojs from 'video.js';
@Component({
  selector: 'app-video-bg',
  templateUrl: './video-bg.component.html',
  styleUrls: ['./video-bg.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.options = this.content.params;
    // instantiate Video.js
    console.log(this.elementRef);
    const video = this.elementRef.nativeElement.querySelectorAll('video')[0];
    this.player = videojs(video, this.options, function onPlayerReady() {
      console.log('onPlayerReady');
    });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}

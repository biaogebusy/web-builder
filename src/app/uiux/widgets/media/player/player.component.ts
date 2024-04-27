import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import type { IPlayer } from '@core/interface/widgets/IPlayer';
import videojs from 'video.js';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', { static: true }) target: ElementRef;
  // See options: https://videojs.com/guides/options
  // https://videojs.com/guides/angular/
  @Input() content: IPlayer;

  player: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.player = videojs(this.target.nativeElement, this.content.options);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}

import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import type { IPlayer } from '@core/interface/widgets/IPlayer';
import Plyr from 'plyr';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  @Input() config: any;
  @ViewChild('player', { read: ElementRef }) player: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.player.nativeElement);
    const player = new Plyr(this.player.nativeElement);
    player.source = this.content.source;
    player.autoplay = this.content.autoplay;
  }
}

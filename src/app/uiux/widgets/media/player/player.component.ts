import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import type { IPlayer } from '@core/interface/widgets/IPlayer';
import Plyr from 'plyr';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @Input() content: IPlayer;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const player = new Plyr('#player');
    player.source = this.content.source;
  }
}

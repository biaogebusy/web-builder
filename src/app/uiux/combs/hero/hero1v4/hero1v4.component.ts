import { Component, Input, OnInit } from '@angular/core';
import type { IHero1v4 } from '@core/interface/combs/IHero';

@Component({
    selector: 'app-hero-1v4',
    templateUrl: './hero1v4.component.html',
    styleUrls: ['./hero1v4.component.scss'],
    standalone: false
})
export class Hero1v4Component implements OnInit {
  @Input() content: IHero1v4;
  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import type { IHero1v3 } from '@core/interface/combs/IHero';

@Component({
  selector: 'app-hero-1v3',
  templateUrl: './hero1v3.component.html',
  styleUrls: ['./hero1v3.component.scss'],
})
export class Hero1v3Component implements OnInit {
  @Input() content: IHero1v3;
  constructor() {}

  ngOnInit(): void {}
}

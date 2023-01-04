import { Component, Input, OnInit } from '@angular/core';
import type { IShowcase3v9 } from '@core/interface/combs/IShowcase';

@Component({
  selector: 'app-showcase-3v9',
  templateUrl: './showcase3v9.component.html',
  styleUrls: ['./showcase3v9.component.scss'],
})
export class Showcase3v9Component implements OnInit {
  @Input() content: IShowcase3v9;
  constructor() {}

  ngOnInit(): void {}
}

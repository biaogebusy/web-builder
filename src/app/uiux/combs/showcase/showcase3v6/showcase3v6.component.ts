import { Component, Input, OnInit } from '@angular/core';
import type { IShowcase3v6 } from '@core/interface/combs/IShowcase';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
  selector: 'app-showcase-3v6',
  templateUrl: './showcase3v6.component.html',
  styleUrls: ['./showcase3v6.component.scss'],
})
export class Showcase3v6Component extends BaseComponent implements OnInit {
  @Input() content: IShowcase3v6;

  ngOnInit(): void {}
}

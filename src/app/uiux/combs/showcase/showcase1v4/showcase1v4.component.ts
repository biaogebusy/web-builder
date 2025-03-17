import { Component, Input, OnInit } from '@angular/core';
import type { IShowcase1v4 } from '@core/interface/combs/IShowcase';
import { BaseComponent } from '@uiux/base/base.widget';

@Component({
    selector: 'app-showcase-1v4',
    templateUrl: './showcase1v4.component.html',
    styleUrls: ['./showcase1v4.component.scss'],
    standalone: false
})
export class Showcase1v4Component extends BaseComponent implements OnInit {
  @Input() content: IShowcase1v4;
  constructor() {
    super();
  }

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import type { IShowcase2v6 } from '@core/interface/combs/IShowcase';

@Component({
    selector: 'app-showcase-2v6',
    templateUrl: './showcase2v6.component.html',
    styleUrls: ['./showcase2v6.component.scss'],
    standalone: false
})
export class Showcase2v6Component implements OnInit {
  @Input() content: IShowcase2v6;

  ngOnInit(): void {}
}

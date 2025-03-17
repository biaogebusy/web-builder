import { Component, Input, OnInit } from '@angular/core';
import type { ICard1v1 } from '@core/interface/widgets/ICard';

@Component({
    selector: 'app-card-1v1',
    templateUrl: './card1v1.component.html',
    styleUrls: ['./card1v1.component.scss'],
    standalone: false
})
export class Card1v1Component implements OnInit {
  @Input() content: ICard1v1;

  ngOnInit(): void {}
}

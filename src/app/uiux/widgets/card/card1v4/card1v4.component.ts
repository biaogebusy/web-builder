import { Component, Input, OnInit } from '@angular/core';
import type { ICard1v4 } from '@core/interface/widgets/ICard';
import { RangePipe } from 'ngx-pipes';

@Component({
  selector: 'app-card-1v4',
  templateUrl: './card1v4.component.html',
  styleUrls: ['./card1v4.component.scss'],
  providers: [RangePipe],
})
export class Card1v4Component implements OnInit {
  @Input() content: ICard1v4;
  constructor(private rangePipe: RangePipe) {}

  ngOnInit(): void {}

  get star(): number[] {
    return this.rangePipe.transform(1, this.content.star);
  }
}

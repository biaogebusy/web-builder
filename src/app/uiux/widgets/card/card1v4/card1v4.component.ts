import { Component, Input, inject } from '@angular/core';
import type { ICard1v4 } from '@core/interface/widgets/ICard';
import { RangePipe } from 'ngx-pipes';

@Component({
    selector: 'app-card-1v4',
    templateUrl: './card1v4.component.html',
    styleUrls: ['./card1v4.component.scss'],
    providers: [RangePipe],
    standalone: false
})
export class Card1v4Component {
  private rangePipe = inject(RangePipe);

  @Input() content: ICard1v4;


  get star(): number[] {
    return this.rangePipe.transform(1, this.content.star);
  }
}

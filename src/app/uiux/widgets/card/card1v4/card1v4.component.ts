import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ICard1v4 } from '@core/interface/widgets/ICard';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { NgPipesModule, RangePipe } from 'ngx-pipes';
import { IconComponent } from '../../icon/icon.component';
import { ImgComponent } from '../../img/img.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card-1v4',
  templateUrl: './card1v4.component.html',
  styleUrls: ['./card1v4.component.scss'],
  imports: [
    NgPipesModule,
    ImgComponent,
    IconComponent,
    ContenteditDirective,
    SafeHtmlPipe,
  ],
  providers: [RangePipe],
})
export class Card1v4Component {
  private rangePipe = inject(RangePipe);

  @Input() content: ICard1v4;


  get star(): number[] {
    return this.rangePipe.transform(1, this.content.star);
  }
}

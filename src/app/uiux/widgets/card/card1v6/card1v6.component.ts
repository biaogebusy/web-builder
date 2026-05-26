import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ICard1v6 } from '@core/interface/widgets/ICard';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { DynamicComponentComponent } from '../../builder/dynamic-component/dynamic-component.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card-1v6',
  templateUrl: './card1v6.component.html',
  styleUrls: ['./card1v6.component.scss'],
  imports: [DynamicComponentComponent, ContenteditDirective, SafeHtmlPipe],
})
export class Card1v6Component {
  @Input() content: ICard1v6;

}

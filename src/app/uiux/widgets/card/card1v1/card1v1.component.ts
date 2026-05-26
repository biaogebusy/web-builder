import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ICard1v1 } from '@core/interface/widgets/ICard';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { DynamicComponentComponent } from '../../builder/dynamic-component/dynamic-component.component';
import { FeatureBoxComponent } from '../../feature-box/feature-box.component';
import { LinkComponent } from '../../link/link.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card-1v1',
  templateUrl: './card1v1.component.html',
  styleUrls: ['./card1v1.component.scss'],
  imports: [
    MatIconModule,
    FeatureBoxComponent,
    DynamicComponentComponent,
    LinkComponent,
    ContenteditDirective,
    SafeHtmlPipe,
  ],
})
export class Card1v1Component {
  @Input() content: ICard1v1;

}

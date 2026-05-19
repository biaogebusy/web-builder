import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContenteditDirective } from '@core/directive/contentedit.directive';
import type { ICard } from '@core/interface/widgets/ICard';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { DynamicComponentComponent } from '../builder/dynamic-component/dynamic-component.component';
import { FeatureBoxComponent } from '../feature-box/feature-box.component';
import { ImgComponent } from '../img/img.component';
import { LinkComponent } from '../link/link.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { CardMetaComponent } from './card-meta/card-meta.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatCardModule,
    ImgComponent,
    LinkComponent,
    FeatureBoxComponent,
    ProgressBarComponent,
    CardMetaComponent,
    DynamicComponentComponent,
    ContenteditDirective,
    SafeHtmlPipe,
  ],
})
export class CardComponent {
  @Input() content: ICard;
  constructor() {}

}

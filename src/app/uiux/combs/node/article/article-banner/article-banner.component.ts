import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { BgImgComponent } from '@uiux/widgets/bg-img/bg-img.component';

@Component({
  selector: 'app-article-banner',
  templateUrl: './article-banner.component.html',
  styleUrls: ['./article-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BgImgComponent],
})
export class ArticleBannerComponent {
  @Input() content: any;
  constructor() {}

}

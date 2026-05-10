import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
    selector: 'app-article-banner',
    templateUrl: './article-banner.component.html',
    styleUrls: ['./article-banner.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ArticleBannerComponent {
  @Input() content: any;
  constructor() {}

}

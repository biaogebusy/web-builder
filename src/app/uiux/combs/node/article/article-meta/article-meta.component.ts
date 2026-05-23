import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { IconComponent } from '@uiux/widgets/icon/icon.component';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafeHtmlPipe, IconComponent],
})
export class ArticleMetaComponent {
  @Input() content: any;
  constructor() {}

}

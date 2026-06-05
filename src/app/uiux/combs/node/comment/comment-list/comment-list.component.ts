import {
  Component,
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import type { IBaseNode, IComment } from '@core/interface/node/INode';
import { SafeHtmlPipe } from '@core/pipe/safe-html.pipe';
import { IconComponent } from '@uiux/widgets/icon/icon.component';
import { CommentItemComponent } from './comment-item/comment-item.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SafeHtmlPipe, IconComponent, CommentItemComponent],
})
export class CommentListComponent {
  readonly content = input.required<IBaseNode>();
  readonly comments = input<IComment[] | null>();

  constructor() {}

}

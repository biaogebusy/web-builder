import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import type { IBaseNode, IComment } from '@core/interface/node/INode';

@Component({
    selector: 'app-comment-list',
    templateUrl: './comment-list.component.html',
    styleUrls: ['./comment-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommentListComponent {
  @Input() content: IBaseNode;
  @Input() comments: IComment[] | null;

  constructor() {}

}

import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { UserState } from '@core/mobx/user/UserState';
import { ICommentContent } from '@core/interface/node/INode';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  @Input() content: any;
  @Input() comments: ICommentContent[];

  constructor(public userState: UserState) {}

  ngOnInit(): void {}
}

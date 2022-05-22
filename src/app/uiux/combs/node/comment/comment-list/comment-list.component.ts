import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
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
  @Output() commentChange = new EventEmitter();

  constructor(public userState: UserState) {}

  ngOnInit(): void {}
}

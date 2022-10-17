import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import type { ICommentConfig } from '@core/interface/node/INode';
import { ContentState } from '@core/mobx/ContentState';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';

@Component({
  selector: 'app-comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentActionsComponent implements OnInit {
  @Input() config: ICommentConfig;
  @Input() item: any;
  @Input() i: number;
  @Input() currentId: string;
  @Input() loading: boolean;
  @Output() update = new EventEmitter();
  @Output() reply = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor(
    public contentState: ContentState,
    @Inject(USER) private user: IUser
  ) {}

  ngOnInit(): void {}

  onUpdate(): void {
    this.update.emit({ item: this.item });
  }

  onReply(): void {
    this.reply.emit({ item: this.item });
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }

  onQuote(): void {
    console.log(this.item);
    this.contentState.commentQuote$.next(this.item);
  }

  isMy(): boolean {
    return (
      this.item.author.id === this.user.id && !(this.item.id === this.currentId)
    );
  }
}

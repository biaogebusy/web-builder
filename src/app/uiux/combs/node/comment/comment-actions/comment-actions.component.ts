import { Component, Input, OnInit, ChangeDetectionStrategy, inject, output } from '@angular/core';
import type { ICommentConfig } from '@core/interface/node/INode';
import { ContentState } from '@core/state/ContentState';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CommentActionsComponent implements OnInit {
  contentState = inject(ContentState);
  private user$ = inject<Observable<IUser>>(USER);

  @Input() config: ICommentConfig;
  @Input() item: any;
  @Input() i: number;
  @Input() currentId: string;
  @Input() loading: boolean;
  readonly update = output<{ item: any }>();
  readonly reply = output<{ item: any }>();
  readonly delete = output<string>();
  user: IUser;

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

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
    this.contentState.commentQuote$.next(this.item);
  }

  isMy(): boolean {
    return this.item.author.id === this.user.id && this.item.id !== this.currentId;
  }
}

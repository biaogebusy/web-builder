import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICommentConfig } from '@core/interface/node/INode';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-comment-actions',
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.scss'],
})
export class CommentActionsComponent implements OnInit {
  @Input() config: ICommentConfig;
  @Input() item: any;
  @Input() i: number;
  @Input() loading: boolean;
  @Output() update = new EventEmitter();
  @Output() reply = new EventEmitter();
  @Output() delete = new EventEmitter();
  constructor(public userState: UserState) {}

  ngOnInit(): void {}

  onUpdate(index: number): void {
    this.update.emit({ item: this.item, index });
  }

  onReply(index: number): void {
    this.reply.emit({ item: this.item, index });
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}

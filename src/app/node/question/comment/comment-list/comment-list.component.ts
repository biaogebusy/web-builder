import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() content: any;
  @Input() comments: any;
  @Input() myCommentId: string;
  @Output() submitComment = new EventEmitter();
  showInlineEditor = false;

  constructor() {}

  ngOnInit(): void {}

  onUpdateMyQuestion(): void {
    this.showInlineEditor = true;
  }

  onSubmitComment(state: boolean): void {
    if (state) {
      this.showInlineEditor = false;
      this.submitComment.emit(state);
    }
  }
}

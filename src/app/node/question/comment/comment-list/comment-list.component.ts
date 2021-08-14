import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() content: any;
  @Input() myCommentId: string;
  @Output() updateMyQuestion = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onUpdateMyQuestion(): void {
    this.updateMyQuestion.emit(true);
  }
}

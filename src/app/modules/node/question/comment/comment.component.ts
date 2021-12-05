import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IControl } from '@core/interface/IForm';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() content: any;
  @Input() comments: any;
  @Input() showEditor: boolean;
  @Input() myCommentId: string;
  @Input() myCommentContent: any;
  @Output() submitEditor = new EventEmitter();
  @Output() updateMyQuestion = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onSubmitComment(state: boolean): void {
    this.submitEditor.emit(state);
  }
}

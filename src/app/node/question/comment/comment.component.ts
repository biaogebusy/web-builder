import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IControl } from '../../../interface/IForm';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() content: any;
  @Input() comments: any;
  @Input() showEditor: boolean;
  @Output() submitEditor = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onSubmitComment(state: boolean): void {
    this.submitEditor.emit(state);
  }
}

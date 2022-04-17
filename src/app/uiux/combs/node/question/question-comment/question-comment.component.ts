import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-question-comment',
  templateUrl: './question-comment.component.html',
  styleUrls: ['./question-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCommentComponent implements OnInit {
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

import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NodeService } from 'src/app/service/node.service';
import { UtilitiesService } from '../../../../service/utilities.service';

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
  loading: boolean;
  showInlineEditor = false;

  constructor(
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService
  ) {}

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

  onDeleteMyQuestion(id: string): void {
    this.loading = true;
    this.nodeService.deleteNode('comment', id).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;
        this.utilitiesService.openSnackbar('您的回答已删除！', '√');
        this.submitComment.emit(true);
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}

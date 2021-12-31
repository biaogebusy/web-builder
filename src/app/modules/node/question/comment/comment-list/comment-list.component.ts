import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private appState: AppState,
    private utilitiesService: UtilitiesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onUpdateMyQuestion(): void {
    this.showInlineEditor = true;
    this.cd.markForCheck();
  }

  onShow(id: string): boolean {
    return this.showInlineEditor && id === this.myCommentId;
  }

  onCancel(): void {
    this.showInlineEditor = false;
    this.cd.markForCheck();
  }

  onSubmitComment(state: boolean): void {
    if (state) {
      this.showInlineEditor = false;
      this.submitComment.emit(state);
      this.cd.markForCheck();
    }
  }

  onDeleteMyQuestion(id: string): void {
    this.loading = true;
    this.nodeService
      .deleteEntity(`${this.appState.apiUrlConfig.commentGetPath}/comment`, id)
      .subscribe(
        (res) => {
          this.loading = false;
          this.utilitiesService.openSnackbar('您的回答已删除！', '√');
          this.submitComment.emit(true);
        },
        () => {
          this.loading = false;
          this.utilitiesService.openSnackbar('Please check user state.', '√');
        }
      );
    this.cd.markForCheck();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
}

import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { AppState } from '@core/mobx/AppState';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserState } from '@core/mobx/user/UserState';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() comments: any;
  @Input() myCommentId: string;
  @Output() submitComment = new EventEmitter();
  loading: boolean;
  showInlineEditor = false;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private appState: AppState,
    private userState: UserState,
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onUpdateMyQuestion(): void {
    this.showInlineEditor = true;
    this.cd.detectChanges();
  }

  onShow(id: string): boolean {
    return this.showInlineEditor && id === this.myCommentId;
  }

  onCancel(): void {
    this.showInlineEditor = false;
    this.cd.detectChanges();
  }

  onSubmitComment(state: boolean): void {
    if (state) {
      this.showInlineEditor = false;
      this.submitComment.emit(state);
      this.cd.detectChanges();
    }
  }

  onDeleteMyQuestion(id: string): void {
    this.loading = true;
    this.nodeService
      .deleteEntity(
        `${this.appState.apiUrlConfig.commentGetPath}/comment`,
        id,
        this.userState.csrfToken
      )
      .pipe(takeUntil(this.destroy$))
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
    this.cd.detectChanges();
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

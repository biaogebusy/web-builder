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
  @Output() commentChange = new EventEmitter();
  loading: boolean;
  showInlineEditor = false;
  currentIndex: number;

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private appState: AppState,
    public userState: UserState,
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onUpdateMyQuestion(i: number): void {
    this.showInlineEditor = true;
    this.currentIndex = i;
    this.cd.detectChanges();
  }

  onShow(id: string, i: number): boolean {
    return (
      this.showInlineEditor &&
      id === this.userState.currentUser.id &&
      i === this.currentIndex
    );
  }

  onCancel(): void {
    this.showInlineEditor = false;
    this.cd.detectChanges();
  }

  onSubmitComment(state: boolean): void {
    if (state) {
      this.showInlineEditor = false;
      this.commentChange.emit(state);
      this.cd.detectChanges();
    }
  }

  onDeleteMyQuestion(id: string): void {
    this.loading = true;
    this.nodeService
      .deleteEntity(
        `${this.appState.apiUrlConfig.commentGetPath}/${this.content.params.comment.attributes.field_name}`,
        id,
        this.userState.csrfToken
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.loading = false;
          this.utilitiesService.openSnackbar('您的回答已删除！', '√');
          this.commentChange.emit(true);
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

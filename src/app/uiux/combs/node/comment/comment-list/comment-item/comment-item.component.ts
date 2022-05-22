import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ICommentContent } from '@core/interface/node/INode';
import { AppState } from '@core/mobx/AppState';
import { UserState } from '@core/mobx/user/UserState';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit, OnDestroy {
  @Input() content: any;
  @Input() comments: ICommentContent[];
  @Output() commentChange = new EventEmitter();
  destroy$: Subject<boolean> = new Subject<boolean>();
  currentId: string;
  showComment = true;
  showActions = true;
  currentData: string;
  loading: boolean;
  type: 'reply' | 'update' | 'add';
  constructor(
    private appState: AppState,
    public userState: UserState,
    private cd: ChangeDetectorRef,
    private nodeService: NodeService,
    private utilitiesService: UtilitiesService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {}

  onUpdate(data: any): void {
    this.currentId = data.item.id;
    this.showComment = false;
    this.showActions = false;
    this.screenService.scrollToAnchor(`q-${data.item.id}`);
    this.currentData = data.item.content;
    this.cd.detectChanges();
  }

  onReply(data: any): void {
    this.currentId = data.item.id;
    this.showComment = true;
    this.showActions = false;
    this.screenService.scrollToAnchor(`q-${data.item.id}`);
    this.currentData = '';
    this.type = 'reply';
    this.cd.detectChanges();
  }

  onShow(item: any): boolean {
    if (item.id !== this.currentId) {
      return true;
    }
    return item.id === this.currentId && this.showComment;
  }

  onCancel(): void {
    this.showComment = true;
    this.showActions = true;
    this.currentId = '';
    this.cd.detectChanges();
  }

  onSubmitComment(state: boolean): void {
    if (state) {
      this.showComment = true;
      this.showActions = true;
      this.screenService.scrollToAnchor(`q-${this.currentId}`);
      this.commentChange.emit(state);
      this.cd.detectChanges();
    }
  }

  onDelete(id: string): void {
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

import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { IBaseNode, ICommentParams } from '@core/interface/node/INode';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent implements OnInit, OnDestroy {
  @Input() content: IBaseNode;
  @Input() commentContent: any;
  @Input() commentId: string;
  @Output() commentChange = new EventEmitter();
  @Output() cancel = new EventEmitter();

  loading = false;
  htmlData = '';
  placeholder = '请输入...';
  destroy$: Subject<boolean> = new Subject<boolean>();
  public Editor: any;

  constructor(
    private cd: ChangeDetectorRef,
    private nodeService: NodeService,
    public screenService: ScreenService,
    private utilitiesService: UtilitiesService,
    private userState: UserState
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      if (this.commentContent) {
        this.htmlData = this.commentContent;
        this.cd.detectChanges();
      }
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onSubmit(value: any): void {
    this.loading = true;
    const params: ICommentParams = this.content.params.comment;
    if (!this.commentContent && params) {
      // 默认支持两种 body 字段，两种都会提交，对应没有的字段后台会弃掉，如果不支持这两种的可以在 jsonapi 覆写字段来匹配， /admin/config/services/jsonapi/add/resource_types
      params.attributes.content = {
        value,
        format: 'full_html',
      };
      params.attributes.comment_body = {
        value,
        format: 'full_html',
      };
      this.nodeService
        .addComment(
          params.attributes?.field_name || '',
          params,
          this.userState.csrfToken
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.loading = false;
            this.utilitiesService.openSnackbar(
              this.content?.editor?.succes.label || '成功提交！'
            );
            this.htmlData = '';
            this.commentChange.emit(true);
          },
          () => {
            this.loading = false;
            this.utilitiesService.openSnackbar('请重新登录！');
          }
        );
    } else {
      const entity: ICommentParams = {
        type: params.type,
        id: this.commentId,
        attributes: {
          comment_body: {
            value,
            format: 'full_html',
          },
          content: {
            value,
            format: 'full_html',
          },
        },
        relationships: {
          uid: {
            data: {
              type: 'user--user',
              id: this.userState.currentUser.id,
            },
          },
        },
      };
      this.nodeService
        .updateComment(
          params.attributes?.field_name || '',
          entity,
          this.commentId,
          this.userState.csrfToken
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.loading = false;
            this.utilitiesService.openSnackbar(
              this.content?.editor?.succes?.label || '更新成功！'
            );
            this.commentChange.emit(true);
          },
          (error) => {
            this.loading = false;
            console.log(error);
          }
        );
    }
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

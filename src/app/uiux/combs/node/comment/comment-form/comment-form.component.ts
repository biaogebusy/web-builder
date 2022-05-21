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
import { merge } from 'lodash-es';
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
  @Input() type: string;
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
    const token = this.userState.csrfToken;
    const params: ICommentParams = this.content.params.comment;
    const type = params.attributes?.field_name || '';
    if (this.type === 'reply') {
      console.log(value);
      const entity = {
        type: params.type,
        attributes: {
          comment_body: {
            value,
            format: 'full_html',
          },
        },
        relationships: {
          pid: {
            data: {
              type: params.type,
              id: this.commentId,
            },
          },
        },
      };
      const data = merge(params, entity);
      this.nodeService.replyComment(type, data, token).subscribe((res) => {
        this.htmlData = '';
        this.done('回复成功！');
      });
      return;
    }
    if (!this.commentContent && params) {
      // 默认comment_boyd，不一致的在后台覆写字段 /admin/config/services/jsonapi/add/resource_types
      params.attributes.comment_body = {
        value,
        format: 'full_html',
      };
      this.nodeService
        .addComment(type, params, this.userState.csrfToken)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.htmlData = '';
            this.done('提交成功！');
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
        .updateComment(type, entity, this.commentId, token)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.done('更新成功！');
          },
          (error) => {
            this.loading = false;
            console.log(error);
          }
        );
    }
    this.cd.detectChanges();
  }

  done(snack: string): void {
    this.loading = false;
    this.utilitiesService.openSnackbar(
      this.content?.editor?.succes?.label || snack
    );
    this.commentChange.emit(true);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  Inject,
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { UserState } from '@core/mobx/user/UserState';
import { ScreenService } from '@core/service/screen.service';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { IBaseNode, ICommentParams } from '@core/interface/node/INode';
import { merge } from 'lodash-es';
import { ContentState } from '@core/mobx/ContentState';
import { QuillModule } from 'ngx-quill';
import { CORE_CONFIG } from '@core/token/core.config';
import { ICoreConfig } from '@core/mobx/IAppConfig';

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
  @Output() cancel = new EventEmitter();

  loading = false;
  placeholder = '请输入...';
  destroy$: Subject<boolean> = new Subject<boolean>();
  modules: QuillModule;

  constructor(
    private cd: ChangeDetectorRef,
    private nodeService: NodeService,
    public screenService: ScreenService,
    private utilitiesService: UtilitiesService,
    private userState: UserState,
    public contentState: ContentState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig
  ) {}

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.modules = Object.assign(
        this.coreConfig?.editor?.modules || {},
        this.content.editor?.modules
      );
      this.contentState.commentQuote$.subscribe((quote: any) => {
        this.screenService.scrollToAnchor('comment');
        this.commentContent = `
          <br>
          <em style="color: rgb(136, 136, 136);font-style: italic;">
          ====================<br>${quote.author.title}<br>${quote.author.subTitle}<br>
          ${quote.content}
          </em>
          `;
        this.cd.detectChanges();
      });
      this.cd.detectChanges();
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
      this.nodeService
        .replyComment(type, data, token)
        .pipe(
          // catchError(() => {
          //   return of({});
          // }),
          takeUntil(this.destroy$)
        )
        .subscribe((res) => {
          this.commentContent = '';
          this.done('回复成功！');
          this.cd.detectChanges();
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
            this.commentContent = '';
            this.done('提交成功！');
            this.cd.detectChanges();
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
        .pipe(
          // catchError(() => {
          //   return of({});
          // }),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (res) => {
            this.done('更新成功！');
            this.cd.detectChanges();
          },
          (error) => {
            this.loading = false;
            console.log(error);
            this.done('更新失败！');
          }
        );
    }
    this.cd.detectChanges();
  }

  done(snack: string): void {
    this.loading = false;
    this.utilitiesService.openSnackbar(
      snack || this.content?.editor?.succes?.label
    );
    this.contentState.commentChange$.next(true);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

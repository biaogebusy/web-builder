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
import { ScreenService } from '@core/service/screen.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import type { IBaseNode, ICommentParams } from '@core/interface/node/INode';
import { merge } from 'lodash-es';
import { ContentState } from '@core/state/ContentState';
import { QuillModule } from 'ngx-quill';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';

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
    public contentState: ContentState,
    @Inject(CORE_CONFIG) private coreConfig: ICoreConfig,
    @Inject(USER) private user: IUser
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
    const token = this.user.csrf_token;
    const params = this.content.params?.comment as ICommentParams;
    const type = params.attributes?.field_name || '';
    // reply, update 在组件内判断处理，默认新增，包括外部组件
    switch (this.type) {
      case 'reply':
        this.reply(value, params, type, token);
        break;
      case 'update':
        this.update(value, params, type, token);
        break;
      default:
        this.add(value, params, type, token);
    }
    this.cd.detectChanges();
  }

  add(
    value: string,
    params: ICommentParams,
    type: string,
    token: string
  ): void {
    // 默认comment_boyd，不一致的在后台覆写字段 /admin/config/services/jsonapi/add/resource_types
    params.attributes.comment_body = {
      value,
      format: 'full_html',
    };
    this.nodeService
      .addComment(type, params, token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.commentContent = '';
          this.done('提交成功！');
          this.cd.detectChanges();
        },
        () => {
          this.loading = false;
          this.utilitiesService.openSnackbar('提交失败！');
          this.cd.detectChanges();
        }
      );
  }

  reply(
    value: string,
    params: ICommentParams,
    type: string,
    token: string
  ): void {
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
    const data = merge({}, params, entity);
    this.nodeService
      .replyComment(type, data, token)
      .pipe(
        // catchError(() => {
        //   return of({});
        // }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.commentContent = '';
        this.done('回复成功！');
        this.cd.detectChanges();
      });
  }

  update(
    value: string,
    params: ICommentParams,
    type: string,
    token: string
  ): void {
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
            id: this.user.id,
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
        () => {
          this.done('更新成功！');
        },
        (error) => {
          console.log(error);
          this.done('更新失败！');
        }
      );
  }

  done(snack: string): void {
    this.loading = false;
    this.cd.detectChanges();
    this.utilitiesService.openSnackbar(
      snack || this.content?.editor?.succes?.label
    );
    this.contentState.commentChange$.next(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

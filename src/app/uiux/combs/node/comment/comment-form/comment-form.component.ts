import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  DestroyRef,
  output
} from '@angular/core';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenService } from '@core/service/screen.service';
import { Observable } from 'rxjs';
import type { IBaseNode, ICommentParams } from '@core/interface/node/INode';
import { merge } from 'lodash-es';
import { ContentState } from '@core/state/ContentState';
import { QuillModule } from 'ngx-quill';
import { CORE_CONFIG, USER } from '@core/token/token-providers';
import type { ICoreConfig } from '@core/interface/IAppConfig';
import type { IUser } from '@core/interface/IUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-comment-form',
    templateUrl: './comment-form.component.html',
    styleUrls: ['./comment-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommentFormComponent implements OnInit {
  private coreConfig = inject<ICoreConfig>(CORE_CONFIG);
  private user$ = inject<Observable<IUser>>(USER);

  @Input() content: IBaseNode;
  @Input() commentContent: any;
  @Input() commentId: string;
  @Input() type: string;
  readonly cancel = output();

  loading = false;
  placeholder = '请输入...';
  modules: QuillModule;

  cd = inject(ChangeDetectorRef);
  nodeService = inject(NodeService);
  screenService = inject(ScreenService);
  utilitiesService = inject(UtilitiesService);
  contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  user: IUser;

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.modules = Object.assign(
        this.coreConfig?.editor?.modules || {},
        this.content.editor?.modules
      );
      this.contentState.commentQuote$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((quote: any) => {
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

  add(value: string, params: ICommentParams, type: string, token: string): void {
    // 默认comment_boyd，不一致的在后台覆写字段 /admin/config/services/jsonapi/add/resource_types
    params.attributes.comment_body = {
      value,
      format: 'full_html',
    };
    this.nodeService
      .addComment(type, params, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
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

  reply(value: string, params: ICommentParams, type: string, token: string): void {
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
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.commentContent = '';
        this.done('回复成功！');
        this.cd.detectChanges();
      });
  }

  update(value: string, params: ICommentParams, type: string, token: string): void {
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
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(
        () => {
          this.done('更新成功！');
        },
        error => {
          console.log(error);
          this.done('更新失败！');
        }
      );
  }

  done(snack: string): void {
    this.loading = false;
    this.cd.detectChanges();
    this.contentState.commentChange$.next(true);
    this.utilitiesService.openSnackbar(snack || this.content?.editor?.succes?.label);
  }

  editorCreated(quill: any): void {
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('image', this.nodeService.imageHandler.bind(this.nodeService, quill));
  }
}

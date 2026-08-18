import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  OnInit,
  ViewContainerRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenService } from '@core/service/screen.service';
import type { IBaseNode, ICommentParams } from '@core/interface/node/INode';
import { merge } from 'lodash-es';
import { ContentState } from '@core/state/ContentState';
import { USER } from '@core/token/token-providers';
import type { IUser } from '@core/interface/IUser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import type { TiptapEditorComponent } from '@uiux/combs/other/tiptap-editor/tiptap-editor.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, TitleComponent, LoadingComponent],
})
export class CommentFormComponent implements OnInit {
  readonly content = input.required<IBaseNode>();
  readonly commentContent = model<string>('');
  readonly commentId = input<string>();
  readonly type = input<string>();
  readonly dismiss = output<void>();

  readonly editorHost = viewChild.required('editorHost', { read: ViewContainerRef });
  readonly editorLoaded = signal(false);

  loading = false;
  placeholder = '请输入...';

  cd = inject(ChangeDetectorRef);
  nodeService = inject(NodeService);
  screenService = inject(ScreenService);
  utilitiesService = inject(UtilitiesService);
  contentState = inject(ContentState);
  private user = inject(USER);
  private destroyRef = inject(DestroyRef);
  private editorRef: ComponentRef<TiptapEditorComponent> | null = null;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.editorRef?.destroy();
    });
  }

  ngOnInit(): void {
    if (!this.screenService.isPlatformBrowser()) {
      return;
    }
    this.contentState.commentQuote$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((quote: any) => {
        this.screenService.scrollToAnchor('comment');
        this.commentContent.set(`
          <br>
          <em style="color: rgb(136, 136, 136);font-style: italic;">
          ====================<br>${quote.author.title}<br>${quote.author.subTitle}<br>
          ${quote.content}
          </em>
          `);
        // A quote must be visible immediately, so mount the editor when it is still collapsed
        if (this.editorRef) {
          this.syncEditorContent();
        } else {
          this.activateEditor();
        }
        this.cd.detectChanges();
      });
  }

  activateEditor(): void {
    if (this.editorRef || this.destroyed || !this.screenService.isPlatformBrowser()) {
      return;
    }
    void this.createEditor();
  }

  private async createEditor(): Promise<void> {
    const { TiptapEditorComponent } = await import(
      '@uiux/combs/other/tiptap-editor/tiptap-editor.component'
    );
    if (this.destroyed || this.editorRef) {
      return;
    }
    const editorRef = this.editorHost().createComponent(TiptapEditorComponent);
    editorRef.setInput('content', {
      html: this.commentContent(),
      placeholder: this.content().editor?.placeholder || this.placeholder,
    });
    editorRef.setInput('height', this.content().editor?.height || '250px');
    // The editor replaces the placeholder button the visitor just activated, so keep the caret there
    editorRef.setInput('autofocus', true);
    editorRef.instance.htmlChange.subscribe(html => this.commentContent.set(html));
    this.editorRef = editorRef;
    this.editorLoaded.set(true);
    this.cd.markForCheck();
  }

  private syncEditorContent(): void {
    this.editorRef?.instance.setContent(this.commentContent());
  }

  onCancel(): void {
    this.dismiss.emit();
  }

  onSubmit(value: string): void {
    this.loading = true;
    const token = (this.user() as IUser)?.access_token;
    const params = this.content().params?.comment as ICommentParams;
    const type = params.attributes?.field_name || '';
    // reply/update are handled inside this component; default is add, including for external components
    switch (this.type()) {
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
    params.attributes.comment_body = {
      value,
      format: 'full_html',
    };
    this.nodeService
      .addComment(type, params, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => {
          this.commentContent.set('');
          this.syncEditorContent();
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
            id: this.commentId(),
          },
        },
      },
    };
    const data = merge({}, params, entity);
    this.nodeService
      .replyComment(type, data, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.commentContent.set('');
        this.syncEditorContent();
        this.done('回复成功！');
        this.cd.detectChanges();
      });
  }

  update(value: string, params: ICommentParams, type: string, token: string): void {
    const entity: ICommentParams = {
      type: params.type,
      id: this.commentId(),
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
            id: (this.user() as IUser)?.id,
          },
        },
      },
    };
    this.nodeService
      .updateComment(type, entity, this.commentId() ?? '', token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => {
          this.done('更新成功！');
        },
        error => {
          console.error(error);
          this.done('更新失败！');
        }
      );
  }

  done(snack: string): void {
    this.loading = false;
    this.cd.detectChanges();
    this.contentState.commentChange.set(true);
    this.utilitiesService.openSnackbar(snack || this.content()?.editor?.success?.label);
  }
}

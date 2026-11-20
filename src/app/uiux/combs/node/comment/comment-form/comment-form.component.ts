import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewContainerRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { CommentService } from '@core/service/comment.service';
import { NodeService } from '@core/service/node.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { ScreenService } from '@core/service/screen.service';
import type { IBaseNode, ICommentParams } from '@core/interface/node/INode';
import { merge } from 'lodash-es';
import { ContentState } from '@core/state/ContentState';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TitleComponent } from '@uiux/widgets/title/title.component';
import { LoadingComponent } from '@uiux/widgets/loading/loading.component';
import type { TiptapEditorComponent } from '@uiux/combs/other/tiptap-editor/tiptap-editor.component';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, TranslateModule, TitleComponent, LoadingComponent],
})
export class CommentFormComponent implements OnInit {
  readonly content = input.required<IBaseNode>();
  readonly commentContent = model<string>('');
  readonly commentId = input<string>();
  readonly type = input<string>();
  readonly dismiss = output<void>();

  readonly editorHost = viewChild.required('editorHost', { read: ViewContainerRef });
  private plainEditor = viewChild<ElementRef<HTMLTextAreaElement>>('plainEditor');
  readonly editorLoaded = signal(false);
  /** Plain-text formats use a textarea instead of the rich-text editor. */
  readonly plainText = signal(false);
  private textFormat = '';
  private document = inject(DOCUMENT);
  private commentService = inject(CommentService);
  readonly editorLoading = signal(false);
  readonly editorError = signal(false);

  loading = false;
  placeholder = '请输入...';

  cd = inject(ChangeDetectorRef);
  nodeService = inject(NodeService);
  screenService = inject(ScreenService);
  utilitiesService = inject(UtilitiesService);
  contentState = inject(ContentState);
  private destroyRef = inject(DestroyRef);
  private editorRef: ComponentRef<TiptapEditorComponent> | null = null;
  private destroyed = false;
  private editorLoadToken = 0;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      this.editorLoadToken++;
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
        const html = `
          <br>
          <em style="color: rgb(136, 136, 136);font-style: italic;">
          ====================<br>${quote.author.title}<br>${quote.author.subTitle}<br>
          ${quote.content}
          </em>
          `;
        this.commentContent.set(this.plainText() ? this.toPlainText(html) : html);
        // A quote must be visible immediately, so mount the editor when it is still collapsed
        if (this.plainText()) {
          this.plainEditor()?.nativeElement.focus();
        } else if (this.editorRef) {
          this.syncEditorContent();
        } else {
          this.activateEditor();
        }
        this.cd.detectChanges();
      });
  }

  activateEditor(): void {
    if (
      this.editorRef ||
      this.editorLoaded() ||
      this.editorLoading() ||
      this.destroyed ||
      !this.screenService.isPlatformBrowser()
    ) {
      return;
    }
    const loadToken = ++this.editorLoadToken;
    void this.createEditor(loadToken);
  }

  private async createEditor(loadToken: number): Promise<void> {
    this.editorLoading.set(true);
    this.editorError.set(false);

    try {
      const params = this.content().params?.comment as ICommentParams;
      const schema = await firstValueFrom(this.commentService.getForm(
        params.type.replace(/^comment--/, ''), this.type() === 'update' ? this.commentId() : undefined
      ));
      if (this.destroyed || loadToken !== this.editorLoadToken) {
        return;
      }
      this.textFormat = schema.textFormat;
      if (schema.editor === 'plain_text') {
        this.commentContent.set(this.toPlainText(this.commentContent()));
        this.plainText.set(true);
        this.editorLoaded.set(true);
        this.cd.detectChanges();
        this.plainEditor()?.nativeElement.focus();
        return;
      }
      const { TiptapEditorComponent } = await import(
        '@uiux/combs/other/tiptap-editor/tiptap-editor.component'
      );
      if (this.destroyed || this.editorRef || loadToken !== this.editorLoadToken) {
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
    } catch (error) {
      if (!this.destroyed && loadToken === this.editorLoadToken) {
        console.error('Error loading Tiptap editor:', error);
        this.editorError.set(true);
      }
    } finally {
      if (!this.destroyed && loadToken === this.editorLoadToken) {
        this.editorLoading.set(false);
        this.cd.markForCheck();
      }
    }
  }

  private syncEditorContent(): void {
    this.editorRef?.instance.setContent(this.commentContent());
  }

  private toPlainText(html: string): string {
    const template = this.document.createElement('template');
    template.innerHTML = html.replace(/<br\s*\/?>(?:\n)?|<\/p>/gi, '\n');
    return template.content.textContent?.trim() ?? '';
  }

  onCancel(): void {
    this.dismiss.emit();
  }

  onSubmit(value: string): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    const params = this.content().params?.comment as ICommentParams;
    const type = params.type.replace(/^comment--/, '');
    // reply/update are handled inside this component; default is add, including for external components
    switch (this.type()) {
      case 'reply':
        this.reply(value, params, type);
        break;
      case 'update':
        this.update(value, params, type);
        break;
      default:
        this.add(value, params, type);
    }
    this.cd.detectChanges();
  }

  add(value: string, params: ICommentParams, type: string): void {
    params.attributes.comment_body = {
      value,
      format: this.textFormat || undefined,
    };
    this.nodeService
      .addComment(type, params)
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

  reply(value: string, params: ICommentParams, type: string): void {
    const entity = {
      type: params.type,
      attributes: {
        comment_body: {
          value,
          format: this.textFormat || undefined,
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
      .replyComment(type, data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.commentContent.set('');
        this.syncEditorContent();
        this.done('回复成功！');
        this.cd.detectChanges();
      }, () => {
        this.loading = false;
        this.utilitiesService.openSnackbar('回复失败！');
        this.cd.detectChanges();
      });
  }

  update(value: string, params: ICommentParams, type: string): void {
    const entity: ICommentParams = {
      type: params.type,
      id: this.commentId(),
      relationships: {},
      attributes: {
        comment_body: {
          value,
          format: this.textFormat || undefined,
        },
      },
    };
    this.nodeService
      .updateComment(type, entity, this.commentId() ?? '')
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

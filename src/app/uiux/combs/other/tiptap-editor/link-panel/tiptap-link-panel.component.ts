import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  ElementRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { Editor } from '@tiptap/core';
import { TOOLBAR_TOOLTIP_ABOVE } from '@core/directive/toolbar-keynav.directive';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

/**
 * tiptap 链接编辑面板(替代 window.prompt):tiptap-editor comb 与气泡工具栏共用。
 * 由父级按需创建(打开即挂载),创建时带入光标处链接并全选输入框;
 * 应用/移除后经 closed 通知父级收起,边框与摆放由父级样式决定
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-link-panel',
  templateUrl: './tiptap-link-panel.component.html',
  styleUrl: './tiptap-link-panel.component.scss',
  imports: [TranslateModule, MatTooltipModule, BtnComponent],
  providers: [TOOLBAR_TOOLTIP_ABOVE],
})
export class TiptapLinkPanelComponent {
  readonly editor = input.required<Editor>();
  readonly closed = output<void>();

  private readonly linkInput = viewChild<ElementRef<HTMLInputElement>>('linkInput');
  private cdr = inject(ChangeDetectorRef);
  private doc = inject(DOCUMENT);

  public linkUrl = signal('');

  constructor() {
    // 编辑器就绪/切换时带入光标处链接地址,并全选输入框便于覆盖输入
    effect(() => {
      this.linkUrl.set(this.editor().getAttributes('link').href ?? '');
      queueMicrotask(() => this.linkInput()?.nativeElement.select());
    });
    // tiptap 事件在 Angular 之外触发,zoneless 下需手动调度变更检测刷新按钮显隐
    effect(onCleanup => {
      const editor = this.editor();
      const refresh = (): void => this.cdr.markForCheck();
      editor.on('transaction', refresh);
      onCleanup(() => editor.off('transaction', refresh));
    });
  }

  /** 应用链接;空 URL 视为移除 */
  apply(url: string): void {
    const href = url.trim();
    const chain = this.editor().chain().focus().extendMarkRange('link');
    if (href) {
      chain.setLink({ href }).run();
    } else {
      chain.unsetLink().run();
    }
    this.closed.emit();
  }

  remove(): void {
    this.editor().chain().focus().extendMarkRange('link').unsetLink().run();
    this.closed.emit();
  }

  open(): void {
    const href = this.editor().getAttributes('link').href;
    if (href) {
      this.doc.defaultView?.open(href, '_blank', 'noopener');
    }
  }

  close(): void {
    this.closed.emit();
  }
}

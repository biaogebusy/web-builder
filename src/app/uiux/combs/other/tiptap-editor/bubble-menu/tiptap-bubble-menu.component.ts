import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Editor } from '@tiptap/core';
import { BtnComponent } from '@uiux/widgets/btn/btn.component';

/**
 * 画布内联编辑的气泡工具栏:由 InlineEditorService 动态创建一次、跨激活复用,
 * 元素交给 tiptap BubbleMenu 扩展定位与显隐(选中文本时浮现)。
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-tiptap-bubble-menu',
  templateUrl: './tiptap-bubble-menu.component.html',
  styleUrl: './tiptap-bubble-menu.component.scss',
  host: {
    '(mousedown)': 'onMousedown($event)',
  },
  imports: [TranslateModule, BtnComponent],
})
export class TiptapBubbleMenuComponent {
  /** 当前活跃的编辑器;为空时不渲染任何按钮 */
  readonly editor = input<Editor | null>(null);

  private readonly linkInput = viewChild<ElementRef<HTMLInputElement>>('linkInput');
  private cdr = inject(ChangeDetectorRef);
  private injector = inject(Injector);

  /** 链接编辑面板(替代 window.prompt):打开时带入光标处链接地址 */
  public linkPanelOpen = signal(false);
  public linkUrl = signal('');

  constructor() {
    // tiptap 事件在 Angular 之外触发,zoneless 下需手动调度变更检测以刷新按钮激活态;
    // 编辑器切换时重置链接面板,避免上一次编辑的残留状态
    effect(onCleanup => {
      const editor = this.editor();
      this.linkPanelOpen.set(false);
      if (!editor) {
        return;
      }
      const refresh = (): void => this.cdr.markForCheck();
      editor.on('transaction', refresh);
      onCleanup(() => editor.off('transaction', refresh));
    });
  }

  /** 按下按钮不夺走编辑器焦点,避免触发失焦提交;链接输入框除外(需要真实焦点) */
  onMousedown(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('input')) {
      event.preventDefault();
    }
  }

  openLinkPanel(): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    this.linkUrl.set(editor.getAttributes('link').href ?? '');
    this.linkPanelOpen.set(true);
    afterNextRender(() => this.linkInput()?.nativeElement.select(), { injector: this.injector });
  }

  closeLinkPanel(): void {
    this.linkPanelOpen.set(false);
    this.editor()?.commands.focus();
  }

  /** 应用链接;空 URL 视为移除 */
  applyLink(url: string): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    const href = url.trim();
    const chain = editor.chain().focus().extendMarkRange('link');
    if (href) {
      chain.setLink({ href }).run();
    } else {
      chain.unsetLink().run();
    }
    this.linkPanelOpen.set(false);
  }

  removeLink(): void {
    this.editor()?.chain().focus().extendMarkRange('link').unsetLink().run();
    this.linkPanelOpen.set(false);
  }

  /** WAI-ARIA toolbar 惯例:左右方向键在工具栏按钮间移动焦点 */
  onToolbarKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }
    const buttons = Array.from(
      (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])'
      )
    );
    const current = (event.target as HTMLElement).closest('button');
    const index = current ? buttons.indexOf(current as HTMLButtonElement) : -1;
    if (index < 0) {
      return;
    }
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    buttons[(index + step + buttons.length) % buttons.length].focus();
  }
}

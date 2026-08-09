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

/** 归一化 rgb()/#rgb 为 input[type=color] 要求的 #rrggbb */
function toHex(value: string | undefined, fallback: string): string {
  if (!value) {
    return fallback;
  }
  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) {
    return '#' + [rgb[1], rgb[2], rgb[3]].map(n => (+n).toString(16).padStart(2, '0')).join('');
  }
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    return '#' + [...value.slice(1)].map(c => c + c).join('');
  }
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    return value;
  }
  return fallback;
}

const ALIGN_ORDER = ['left', 'center', 'right', 'justify'];

/**
 * tiptap 气泡工具栏:画布内联编辑(InlineEditorService)与 tiptap-editor comb 共用,
 * 元素交给 BubbleMenu 扩展定位与显隐(选中文本时浮现)。
 * 面板内一律不用 mat-menu/overlay——它们会夺走编辑器焦点,触发失焦提交。
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
  /** 选区级文字样式面板:字色/背景色/字号 */
  public stylePanelOpen = signal(false);
  public readonly fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '30px', '36px', '48px'];

  constructor() {
    // tiptap 事件在 Angular 之外触发,zoneless 下需手动调度变更检测以刷新按钮激活态;
    // 编辑器切换时重置各面板,避免上一次编辑的残留状态
    effect(onCleanup => {
      const editor = this.editor();
      this.linkPanelOpen.set(false);
      this.stylePanelOpen.set(false);
      if (!editor) {
        return;
      }
      const refresh = (): void => this.cdr.markForCheck();
      editor.on('transaction', refresh);
      onCleanup(() => editor.off('transaction', refresh));
    });
  }

  /** 按下按钮不夺走编辑器焦点,避免触发失焦提交;表单控件除外(需要真实焦点) */
  onMousedown(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('input, select, label')) {
      event.preventDefault();
    }
  }

  openLinkPanel(): void {
    const editor = this.editor();
    if (!editor) {
      return;
    }
    this.stylePanelOpen.set(false);
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

  toggleStylePanel(): void {
    this.linkPanelOpen.set(false);
    this.stylePanelOpen.update(open => !open);
  }

  /** TextAlign 仅注册于多段落档(rich/comb);单行标题无段落,不显示对齐按钮 */
  hasAlign(editor: Editor): boolean {
    return editor.extensionManager.extensions.some(ext => ext.name === 'textAlign');
  }

  alignIcon(editor: Editor): string {
    const active = ALIGN_ORDER.slice(1).find(align => editor.isActive({ textAlign: align }));
    return `format-align-${active ?? 'left'}`;
  }

  /** 对齐单键循环切换(左→中→右→两端);气泡内不用 mat-menu,避免夺焦 */
  cycleAlign(editor: Editor): void {
    const current = ALIGN_ORDER.find(align => editor.isActive({ textAlign: align })) ?? 'left';
    const next = ALIGN_ORDER[(ALIGN_ORDER.indexOf(current) + 1) % ALIGN_ORDER.length];
    editor.chain().focus().setTextAlign(next).run();
  }

  /** 当前选区文字样式值,hex 化供 input[type=color] 回显 */
  colorValue(editor: Editor, attr: 'color' | 'backgroundColor', fallback: string): string {
    return toHex(editor.getAttributes('textStyle')[attr], fallback);
  }

  fontSizeValue(editor: Editor): string {
    return editor.getAttributes('textStyle').fontSize ?? '';
  }

  /** 颜色实时应用:不链 focus(),避免把焦点从原生取色器抢回来打断拖选 */
  applyColor(editor: Editor, value: string): void {
    editor.chain().setColor(value).run();
  }

  applyBgColor(editor: Editor, value: string): void {
    editor.chain().setBackgroundColor(value).run();
  }

  /** 空值恢复默认字号 */
  applyFontSize(editor: Editor, value: string): void {
    const chain = editor.chain().focus();
    if (value) {
      chain.setFontSize(value).run();
    } else {
      chain.unsetFontSize().run();
    }
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
